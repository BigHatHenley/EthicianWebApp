const container = document.querySelector('.container');
let lineLength = ~~(window.innerWidth * 0.03);
let intervalId = null;
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyserNode = audioContext.createAnalyser();
let microphoneStream = null;
let frequencyData = new Uint8Array(analyserNode.frequencyBinCount);

const animateEqualizer = () => {
  intervalId = setInterval(() => {
    analyserNode.getByteFrequencyData(frequencyData);

    const topLines = document.querySelectorAll('.equalizer.top .line');
    const bottomLines = document.querySelectorAll('.equalizer.bottom .line');

    frequencyData.forEach((value, idx) => {
      const height = Math.max(10, value);  // Ensure there's a minimum height for the bars
      topLines[idx].style.height = `${height}px`;
      bottomLines[idx].style.height = `${height}px`;
    });
  }, 100);
}

const createEqualizer = (className) => {
  const equalizerDiv = document.createElement('div');
  equalizerDiv.classList.add('equalizer', className);
  container.appendChild(equalizerDiv);
}

const createLines = (n, equalizer) => {
  createEqualizer(equalizer);
  const parent = document.querySelector(`.equalizer.${equalizer}`);
  
  for (let i = 0; i < n; i++) {
    const lineDiv = document.createElement('div');
    lineDiv.classList.add('line');
    parent.appendChild(lineDiv);
  }
}

const createContents = () => {
  const equalizers = ['top', 'bottom'];
  
  equalizers.forEach(equalizer => createLines(lineLength, equalizer));
  animateEqualizer();
}

const handleResize = () => {
  clearInterval(intervalId);
  lineLength = ~~(window.innerWidth * 0.03);
  const equalizers = document.querySelectorAll('.equalizer');
  equalizers.forEach(equalizer => equalizer.remove());
  createContents();
}

// Start capturing audio and update the equalizer
const startAudioCapture = async () => {
  try {
    microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const sourceNode = audioContext.createMediaStreamSource(microphoneStream);
    sourceNode.connect(analyserNode);
    analyserNode.fftSize = 256;  // Set the FFT size for frequency data analysis
    createContents();
  } catch (err) {
    console.error('Error accessing microphone:', err);
  }
}

window.addEventListener('resize', handleResize);

startAudioCapture(); // Start capturing audio when the page loads