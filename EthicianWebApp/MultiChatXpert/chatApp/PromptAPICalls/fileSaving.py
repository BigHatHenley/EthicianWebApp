from chatApp.models import UploadedFileModel
from .fileHandling import fileUpload


def save_and_process_file(uploaded_file, UploadedFileModel):
    if uploaded_file:
        # Calling fileUpload with required parameters directly
        # Assuming `instance`, `selection`, `touch`, and `modifiers` are not required for this backend use
        file_data = fileUpload(uploaded_file, selection=[uploaded_file.name], instance=None)
        
        # Save the uploaded file data in the database
        saved_file = UploadedFileModel.objects.create(
            file=uploaded_file,
            file_data=file_data  # Optional: Save processed data in database
        )
        return file_data
    else:
        return None