import React, { useRef, useState } from 'react';
import WebViewer from '@pdftron/pdfjs-express';
import './App.css';

const App = () => {
  const viewer = useRef(null);
  const inputFile = useRef(document.getElementById("file"))
  const xfdfFile = useRef(document.getElementById("xfdfFile"))
  const [xfdf, setXfdf] = useState("");
  


  
  
  function getAnnots(f) {
    const reader = new FileReader()
    reader.onload = async (f) => { 
      const text = (f.target.result)
      console.log(text)
      setXfdf(text)
    
    };
    reader.readAsText(f)
  }



  function startWebViewer(f) {
    WebViewer(
      {
        path: '/webviewer/lib',
        disableFlattenedAnnotations: true,
      },
      viewer.current,
    ).then((instance) => {
      instance.loadDocument(f, { filename: f.name });
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();
      docViewer.on('documentLoaded', async () => {

        const xfdfString = xfdf

        // This is the string of annotations we need!  
        // Now all we have to do is comb through it, and delete everything that isn't
        // FreeText with a white background, or a line

        // Then we import the xfdfString again, so the annots appear
        await annotManager.importAnnotations(xfdfString)

        // Finally, we just re-create the acrobat *.js file below
        const a = annotManager.getAnnotationsList();
       
          
        

        var fbCount = 1;
        var pagesToSave = [];
        var annotsToDelete = [];
        var data = "";
        for (var o = 0; o < a.length; o++) {
          console.log("Page " + a[o].PageNumber + "here");
          var typeOfAnnot = a[o].Subject;
        
          
          
          console.log(typeOfAnnot);
          
          if (typeOfAnnot === "引き出し線") {
            var color = a[o].FillColor;
            console.log(color.R)
            if (color.R === 255) {

              const freeText = new Annotations.FreeTextAnnotation();
              freeText.PageNumber = a[o].PageNumber;
              freeText.X = a[o].X + 50;
              freeText.Y = a[o].Y + 50;
              freeText.Width = 200;
              freeText.Height = 50;
              freeText.setPadding(new Annotations.Rect(0, 0, 0, 0));
              freeText.setContents(fbCount.toString());
              freeText.FillColor = new Annotations.Color(255, 255, 0);
              freeText.FontSize = '16pt';
        
              annotManager.addAnnotation(freeText);
              annotManager.redrawAnnotation(freeText);
          //     //var theseWordsAndQuads = getWordsAndQuadsFromPage(p)
          //     //var returnWords = compareQuadsAndBounds(theseWordsAndQuads[0], theseWordsAndQuads[1], bounds)
              console.log("Chushaku contents: " + a[o].getContents())
          //     //console.println("Chushaku surroundings: " + returnWords)
               data = data + String(fbCount) + "\r" + a[o].getContents() + '\r\n\r\n';
    
             
               fbCount = fbCount + 1;
               pagesToSave.push(a[o].PageNumber);
             } else {
               annotsToDelete.push(a[o]);
             }
           } else {
            annotsToDelete.push(a[o]);
          }
        }
        console.log(pagesToSave)
        console.log(annotsToDelete);

        // Delete the annots
        await annotManager.deleteAnnotations(annotsToDelete)

        for (var p = 0; p < docViewer.getPageCount(); p++) {
          if (pagesToSave.indexOf(p) < 0) {
            await docViewer.removePages(p);
          }
        }
      });
    });
  }
    

  return (
    <div className="App">
      <div className="header">React sample</div>
      <label for="file_upload">Choose A file</label>
        <input type="file" 
                id="file" 
                ref={inputFile}
                accept=".pdf" 
                onChange={(e)=>{
                  console.log('---')
                  console.log(inputFile.current.files[0].name)
                  startWebViewer(inputFile.current.files[0])

                }}
          />
      <label for="annot_upload">Choose an XFDF file</label>
        <input type="file" 
                id="xfdfFile" 
                ref={xfdfFile}
                accept=".xfdf" 
                onChange={(e)=>{
                  console.log(xfdfFile.current.files[0].name)
                  getAnnots(xfdfFile.current.files[0])
                  
                }}
          />
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};


export default App;
