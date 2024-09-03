import pywintypes
from PIL import Image
import os
import base64
import docx2txt
import PyPDF2


def fileUpload(self, instance, selection, touch=None, modifiers=None):
    global uploadedFile
    global fileText
    global fileImg
    global imgPath
    global b64Img
    global file_type

    print("Selected files:", selection)
    print("Touch event:", touch)
    print("Modifier keys:", modifiers)

    try:
        # Get the selected file from the file chooser
        selected_file = self.file_chooser.selection and self.file_chooser.selection[0] or None
        self.output_label.text += f"Selected File: {selected_file}\n\n"
    except pywintypes.error as e:
        # Suppress specific errors related to accessing system files
        pass
    except Exception as e:
        # Handle the exception gracefully
        self.output_label.text = f"Error: {str(e)}\n\n"

    if selection:
        imgPath = selection[0]
        uploadedFile = os.path.basename(selection[0])   #Test to see if it gives us the file name or if it just opens it...
        print(imgPath)
        print(uploadedFile)

        if '.txt' in uploadedFile:
            file2Read = open(uploadedFile, "r")

            for paragraph in file2Read:
                fileText += paragraph
                
            file_type="txt"
             
        elif '.docx' in uploadedFile:
            fileText += docx2txt.process(uploadedFile)
            file_type = "docx"
             
        elif '.pdf' in uploadedFile:
            file2Read = open(uploadedFile, 'rb')
            pdfReader = PyPDF2.PdfReader(file2Read)

            for page in range(0, len(pdfReader.pages)):
                page2Read = pdfReader.pages[page]
                fileText += page2Read.extract_text()
                
            file_type="pdf"
            
        elif '.png' or '.PNG':
            b64Img = self.encode_image(imgPath)
            file_type="png"

        elif '.jpg' or '.JPG' or '.jpeg':
            b64Img = self.encode_image(imgPath)
            file_type="jpeg"

        elif '.webm':
            b64Img = self.encode_image(imgPath)
            file_type="webm"

        elif '.webp':
            b64Img = self.encode_image(imgPath)
            file_type="webp"

        else:
            print("File Not Applicable")

            self.fileUploaded=True
            self.file_button.background_color = (0.2, 0.545, 0.604, 1)
         
    else:
        fileText = ""
        self.fileUploaded=False
        instance.background_color = (1.0, 0.85, 0.75, 1)

         #print(uploadedFile)
        print(fileText)


#===== base64 encode images ====
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')