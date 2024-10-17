from chatApp.models import UploadedFileModel
from .fileHandling import fileUpload


def save_and_process_file(uploaded_file, UploadedFileModel):
    if uploaded_file:
        file_data = fileUpload(uploaded_file)  # Your function to process and convert files
        saved_file = UploadedFileModel.objects.create(
            file=uploaded_file,
            file_data=file_data  # Optional: Save processed data in database
        )
        return file_data
    else:
        return None