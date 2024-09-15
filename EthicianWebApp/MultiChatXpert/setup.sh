# Check the operating system and install portaudio19-dev if necessary
if [ "$(uname)" == "Darwin" ]; then
    # macOS
    echo "Detected macOS. Installing portaudio..."
    brew install portaudio
    brew link portaudio
    pip install pyaudio
elif [ -f /etc/debian_version ]; then
    # Debian-based Linux (e.g., Ubuntu)
    echo "Detected Debian-based Linux. Installing portaudio (if possible without sudo)..."
    apt-get update
    apt-get install -y portaudio19-dev || echo "Unable to install portaudio19-dev; please check permissions."
    # Fallback to installing prebuilt PyAudio wheel
    pip install pipwin
    pipwin install pyaudio
elif [ -f /etc/redhat-release ]; then
    # Red Hat-based Linux (e.g., Fedora, CentOS)
    echo "Detected Red Hat-based Linux. Installing portaudio-devel..."
    yum install -y portaudio-devel || echo "Unable to install portaudio-devel; please check permissions."
else
    echo "Unsupported OS. Please manually install portaudio."
    exit 1
fi

# Install Python packages
pip install -r requirements.txt