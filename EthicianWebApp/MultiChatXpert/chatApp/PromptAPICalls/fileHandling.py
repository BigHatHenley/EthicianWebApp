import base64
import mimetypes

def fileUpload(uploaded_file, instance=None, selection=None):
    # Get the MIME type and file extension
    mime_type, _ = mimetypes.guess_type(uploaded_file.name)
    file_extension = uploaded_file.name.split('.')[-1].lower()  # get file extension in lowercase
    
    # Check and log extracted values
    print(f"Processing file: {uploaded_file.name}")
    print(f"Detected MIME type: {mime_type}")
    print(f"Detected file extension (type): {file_extension}")

    # Prepare the content in base64 for image files or raw text for others
    content = None
    try:
        if mime_type and mime_type.startswith("image/"):
            # Read and encode image files as base64
            content = base64.b64encode(uploaded_file.read()).decode('utf-8')
        elif file_extension in ['txt', 'docx', 'pdf']:
            # Attempt to read non-image files as text
            content = uploaded_file.read().decode('utf-8')
        else:
            print(f"Unsupported file type: {file_extension}")
    except Exception as e:
        print(f"Error reading file content: {e}")
        content = None

    # Log final data structure
    file_data = {
        "name": uploaded_file.name,
        "file_type": file_extension,
        "mime_type": mime_type,
        "content": content,
    }
    print(f"File data prepared: {file_data}")

    return file_data
