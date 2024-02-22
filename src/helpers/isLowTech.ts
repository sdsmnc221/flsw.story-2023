// Feature detection
// const supportsWebGL = () => {
//     try {
//       const canvas = document.createElement('canvas');
//       return !!(
//         window.WebGLRenderingContext &&
//         (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
//       );
//     } catch (e) {
//       return false;
//     }
//   };

import isSafari from "./isSafari";
import isTablet from "./isTablet";

//   const supportsWebAssembly = () => {
//     return typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function';
//   };

// Check for Performance API
const supportsPerformanceAPI = () => {
  return (
    "performance" in window && typeof window.performance.now === "function"
  );
};

// Environmental factors
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const isLowNetworkSpeed = () => {
  // Check network speed using the Network Information API if available
  // Example: navigator.connection.downlink <= 1; // Low network speed
  return false;
};

const isLowTech = (): boolean => {
  if (
    isLowNetworkSpeed() ||
    !supportsPerformanceAPI() ||
    isSafari() ||
    isMobileDevice() ||
    isTablet()
  ) {
    console.log("Low RAM device or slow network");
    return true;
  } else {
    console.log("High RAM device or fast network");
    return false;
  }
};

export default isLowTech;
