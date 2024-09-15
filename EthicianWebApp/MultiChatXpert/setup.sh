# Check the operating system and install portaudio19-dev if necessary
if [ "$(uname)" == "Darwin" ]; then
    # macOS
    echo "Detected macOS. Installing portaudio..."
    brew install portaudio
    brew link portaudio
    pip install pyaudio
elif [ -f /etc/debian_version ]; then
    # Debian-based Linux (e.g., Ubuntu)
    echo "Detected Debian-based Linux. Installing portaudio19-dev..."
    sudo apt-get update
    sudo apt-get install -y portaudio19-dev
    sudo apt-get install -y python-pyaudio
    pip install --global-option='build_ext' --global-option='-I/usr/local/include' --global-option='-L/usr/local/lib' pyaudio
elif [ -f /etc/redhat-release ]; then
    # Red Hat-based Linux (e.g., Fedora, CentOS)
    echo "Detected Red Hat-based Linux. Installing portaudio-devel..."
    sudo yum install -y portaudio-devel
else
    echo "Unsupported OS. Please manually install portaudio."
    exit 1
fi

# Install Python packages
pip install -r requirements.txt