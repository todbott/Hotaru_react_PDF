# React PDF editor

We do a lot of preparation of text for multilingual translation at my current company.  Many times, we get PDFs full of comments and things (500 pages or so), and we have to 1) check each page of the PDF, 2) if there's a comment, extract the text from the comment (for translation) and 3) delete any pages that contain no comments.  Done by hand, this takes hours and is prone to human error.

I automated the process with this React program (will deploy it on AWS Amplify by the end of the year, I hope).  Users can upload a PDF file, and a XDFX file (a special type of PDF), and the system automatically processes the PDF, removing all unnecessary pages and producing a simple text document, which we can then bring into Trados Studio in order to translate it.

## Booooring

This is the kind of nuts-and-bolts translation industry scripting/coding I've been doing since 2017.  Not very interesting or generally-usable, so I've not put any of it on GitHub until now.  Unless you work in the translation industry/translation coordination industry, you probably don't want to fork this repo :)
