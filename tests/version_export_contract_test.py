#!/usr/bin/env python3
"""Check the three deployed version links and their genuine PPTX packages."""
from pathlib import Path
import zipfile
from xml.etree import ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
VERSIONS={
    "v7":(ROOT/"versions/v7/index.html",44),
    "v10":(ROOT/"drafts/rev10.html",55),
    "current":(ROOT/"slides/index.html",107),
}
N="{http://schemas.openxmlformats.org/presentationml/2006/main}"
assert (ROOT/"versions/version-nav.js").is_file()
catalog=(ROOT/"versions/index.html").read_text()
for url in ("./v7/","../drafts/rev10.html","../slides/",
            "../downloads/agent101-v7.pptx",
            "../downloads/agent101-v10.pptx",
            "../downloads/agent101-current.pptx"):
    assert url in catalog,url
assert (ROOT/"versions/version-nav.css").is_file()
js=(ROOT/"versions/version-nav.js").read_text()
for item in ["versions/v7/","drafts/rev10.html","slides/",
             "downloads/agent101-v7.pptx","downloads/agent101-v10.pptx","downloads/agent101-current.pptx"]:
    assert item in js, item

for name,(html,expected) in VERSIONS.items():
    src=html.read_text()
    count=src.count('<section class="slide')
    assert count==expected,(name,count,expected)
    assert "version-nav.js" in src,(name,"no version selector")
    target=ROOT/"downloads"/("agent101-"+name+".pptx")
    assert target.exists() and target.stat().st_size>50000,target
    with zipfile.ZipFile(target) as z:
        assert z.testzip() is None,(name,"broken PPTX ZIP")
        members=z.namelist()
        slide_files=[x for x in members if x.startswith("ppt/slides/slide")
                     and x.endswith(".xml") and "/_rels/" not in x]
        images=[x for x in members if x.startswith("ppt/media/")
                and x.endswith(".png")]
        note_files=[x for x in members if x.startswith("ppt/notesSlides/notesSlide")
                    and x.endswith(".xml") and "/_rels/" not in x]
        assert len(slide_files)==expected,(name,"slides",len(slide_files))
        assert len(images)==expected,(name,"images",len(images))
        assert len(note_files)==expected,(name,"speaker notes",len(note_files))
        if name=="current":
            for page in (8,30,38,49,54,82,95,107):
                note=ET.fromstring(z.read("ppt/notesSlides/notesSlide%d.xml"%page))
                notes=" ".join(el.text or "" for el in note.iter() if el.tag.endswith("}t"))
                assert "Exit Check 參考答案" in notes,(name,page,"missing answer notes")
                assert all(question in notes for question in ("Q1","Q2","Q3")),(name,page)
        presentation=ET.fromstring(z.read("ppt/presentation.xml"))
        sldIds=presentation.find(N+"sldIdLst")
        assert len(sldIds)==expected,(name,"presentation slides",len(sldIds))
        for n in (1,expected):
            slide=ET.fromstring(z.read("ppt/slides/slide"+str(n)+".xml"))
            assert slide.find(N+"cSld") is not None,(name,n)
    print("%s: %d HTML pages, %d PPTX slides, %d PNG pages, %d notes; %.2f MB"%
          (name,expected,len(slide_files),len(images),len(note_files),target.stat().st_size/1048576))
print("version switcher and all PowerPoint exports: PASS")
