#!/usr/bin/env python3
"""Prevent screenshot-only PPTX regressions for all three Agent-101 versions."""
from pathlib import Path
import json
import re
import zipfile
from xml.etree import ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
VERSIONS={
    "v7":(ROOT/"versions/v7/index.html",44),
    "v10":(ROOT/"drafts/rev10.html",55),
    "current":(ROOT/"slides/index.html",107),
}
NS={
    "p":"http://schemas.openxmlformats.org/presentationml/2006/main",
    "a":"http://schemas.openxmlformats.org/drawingml/2006/main",
}
report=json.loads((ROOT/"downloads/agent101-native-export-report.json").read_text())
reports={item["version"]:item for item in report["results"]}
assert set(reports)==set(VERSIONS),("export report missing versions",reports.keys())
catalog=(ROOT/"versions/index.html").read_text()
nav=(ROOT/"versions/version-nav.js").read_text()
for url in ("./v7/","../drafts/rev10.html","../slides/"):
    assert url in catalog, ("missing version link",url)

for version,(html,expected) in VERSIONS.items():
    assert html.read_text().count('<section class="slide')==expected
    assert "version-nav.js" in html.read_text()
    editable_filename=f"agent101-{version}-editable.pptx"
    fallback_filename=f"agent101-{version}.pptx"
    assert "../downloads/"+editable_filename in catalog
    assert "downloads/"+editable_filename in nav
    editable=ROOT/"downloads"/editable_filename
    static=ROOT/"downloads"/fallback_filename
    audit=reports[version]
    assert audit["slides"]==expected,(version,"audit page count")
    assert audit["text_recall"]["minimum"]>=.80,(version,"lost browser-visible text",audit)
    assert audit["text_recall"]["mean"]>=.95,(version,"bad mean text recall",audit)
    assert editable.is_file() and editable.stat().st_size>15000,editable
    assert static.is_file() and static.stat().st_size>50000,static
    assert editable.stat().st_size==audit["bytes"],(version,"report does not match actual artifact")
    notes_native={}
    with zipfile.ZipFile(editable) as z:
        assert z.testzip() is None,("invalid editable PPTX",version)
        files=z.namelist()
        slides=[n for n in files if re.fullmatch(r"ppt/slides/slide\d+\.xml",n)]
        notes=[n for n in files if re.fullmatch(r"ppt/notesSlides/notesSlide\d+\.xml",n)]
        assert len(slides)==expected,(version,"pages",len(slides))
        assert len(notes)==expected,(version,"notes",len(notes))
        pres=ET.fromstring(z.read("ppt/presentation.xml"))
        ids=pres.find("p:sldIdLst",NS)
        assert ids is not None and len(ids)==expected
        sld_size=pres.find("p:sldSz",NS)
        cw,ch=int(sld_size.get("cx")),int(sld_size.get("cy"))
        total_text_shapes=total_shape_count=total_pics=0
        no_text=[]
        full_frame=[]
        for n in range(1,expected+1):
            root=ET.fromstring(z.read(f"ppt/slides/slide{n}.xml"))
            shape_nodes=root.findall(".//p:sp",NS)
            pics=root.findall(".//p:pic",NS)
            bg=shape_nodes[0].find(".//a:solidFill/a:srgbClr",NS) if shape_nodes else None
            assert bg is not None and bg.get("val","").upper() not in ("FFFFFF","FDFDFD"),(version,n,"lost dark background")
            text_count=sum(
                any((t.text or "").strip() for t in sp.findall(".//a:t",NS))
                for sp in shape_nodes
            )
            if not text_count:
                no_text.append(n)
            total_text_shapes+=text_count
            total_shape_count+=len(shape_nodes)
            total_pics+=len(pics)
            if version=="v7" and n==3:
                assert text_count>=15 and len(shape_nodes)>=25 and not pics,("flattened SVG flowchart",n)
            if version=="current" and n==2:
                assert text_count>=16 and len(shape_nodes)>=35,("flattened course map",n)
            for pic in pics:
                ext=pic.find("./p:spPr/a:xfrm/a:ext",NS)
                if ext is None:
                    continue
                if int(ext.get("cx","0"))*int(ext.get("cy","0"))>=cw*ch*.9:
                    full_frame.append(n)
        assert not no_text,(version,"pages without editable text",no_text)
        assert not full_frame,(version,"flattened full-slide pictures",full_frame)
        assert total_text_shapes>=expected*2,(version,"too few text shapes",total_text_shapes)
        assert total_shape_count>=expected*3,(version,"too few native shapes",total_shape_count)
        for page in range(1,expected+1):
            node=ET.fromstring(z.read(f"ppt/notesSlides/notesSlide{page}.xml"))
            note_text=" ".join((n.text or "") for n in node.iter() if n.tag.endswith("}t"))
            notes_native[page]=note_text
            assert f"第 {page} 頁" in note_text,(version,page,"speaker notes page shifted")
        for page in (8,30,38,49,54,82,95,107) if version=="current" else (1,expected):
            xml=ET.fromstring(z.read(f"ppt/notesSlides/notesSlide{page}.xml"))
            t=" ".join((node.text or "") for node in xml.iter()
                       if node.tag.endswith("}t"))
            assert len(t.strip())>10,(version,page,"blank notes")
            if version=="current":
                assert "Exit Check 參考答案" in t,(version,page,"missing quiz answers")
                for q in ("Q1","Q2","Q3"):
                    assert q in t,(version,page,"missing",q)
        print(f"{version}: {expected} pages, {total_text_shapes} editable text shapes, "
              f"{total_shape_count-total_text_shapes} other native shapes, "
              f"{total_pics} independent pictures; Notes PASS")
    with zipfile.ZipFile(static) as z:
        slides=[n for n in z.namelist()
                if re.fullmatch(r"ppt/slides/slide\d+\.xml",n)]
        assert len(slides)==expected,(version,"static fallback",len(slides))
        for page in range(1,expected+1):
            node=ET.fromstring(z.read(f"ppt/notesSlides/notesSlide{page}.xml"))
            note_old=" ".join((n.text or "") for n in node.iter() if n.tag.endswith("}t"))
            note_new=notes_native[page]
            assert len(note_new)>len(note_old)*.65,(version,page,"speaker notes too short")
            assert f"第 {page} 頁" in note_old,(version,page,"source notes page mismatch")

print("ALL_NATIVE_EDITABLE_EXPORT_CONTRACTS_PASS")
