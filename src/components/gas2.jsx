import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import "./GasTracker.css";

const GasTracker = () => {
  const [gasAmount, setGasAmount] = useState(null);
  const [audioTrack, setAudioTrack] = useState("");
  const [imageSrc, setImageSrc] = useState("/media/img/lo.png");
  const player = useRef(new Tone.Player().toDestination());
  const [overlayStyle, setOverlayStyle] = useState({});

  // Function to fetch gas amount from Etherscan API
  const fetchGasAmount = async () => {
    const etherscanKey = import.meta.env.VITE_ETHERSCAN_KEY;
    try {
      console.log("Fetching Gas Amount");
      const response = await fetch(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanKey}`
      );
      const data = await response.json();
      const safeGas = parseInt(data.result.SafeGasPrice);
      console.log(safeGas);
      setGasAmount(safeGas);
      determineTrackAndImage(safeGas);
    } catch (error) {
      console.error("Error fetching gas amount:", error);
    }
  };

  // Function to determine which audio track and image to use
  const determineTrackAndImage = (gas) => {
    if (gas < 20) {
      setAudioTrack("/media/audio/lo_1.mp3");
      setImageSrc("/media/img/lo.png");
      setOverlayStyle({
        top: "39%",
        left: "49.99%",
        fontSize: "5vw",
      });
    } else if (gas < 40) {
      setAudioTrack("/media/audio/lo_2.mp3");
      setImageSrc("/media/img/lo.png");
      setOverlayStyle({
        top: "39%",
        left: "49.99%",
        fontSize: "5vw",
      });
    } else if (gas < 60) {
      setAudioTrack("/media/audio/lo_3.mp3");
      setImageSrc("/media/img/lo.png");
      setOverlayStyle({
        top: "39%",
        left: "49.99%",
        fontSize: "5vw",
      });
    } else if (gas < 80) {
      setAudioTrack("/media/audio/lo_4.mp3");
      setImageSrc("/media/img/lo.png");
      setOverlayStyle({
        top: "39%",
        left: "49.99%",
        fontSize: "5vw",
      });
    } else if (gas < 100) {
      setAudioTrack("/media/audio/high-1.mp3");
      setImageSrc("/media/img/hi.png");
      setOverlayStyle({
        top: "43%",
        left: "49.5%",
        transform: "translate(-50%, -50%)",
      });
    } else if (gas < 200) {
      setAudioTrack("/media/audio/high-2.mp3");
      setImageSrc("/media/img/hi.png");
      setOverlayStyle({
        top: "36%",
        left: "52%",
        transform: "translate(-50%, -50%)",
      });
    } else if (gas < 300) {
      setAudioTrack("/media/audio/high-3.mp3");
      setImageSrc("/media/img/hi.png");
      setOverlayStyle({
        top: "43%",
        left: "49.5%",
        transform: "translate(-50%, -50%)",
      });
    } else {
      setAudioTrack("/media/audio/high-4.mp3");
      setImageSrc("/media/img/hi.png");
      setOverlayStyle({
        top: "43%",
        left: "49.5%",
        transform: "translate(-50%, -50%)",
      });
    }
  };

  useEffect(() => {
    // Load and play audio when audioTrack changes
    const loadAndPlayAudio = async () => {
      if (audioTrack) {
        try {
          await player.current.load(audioTrack);
          await Tone.start();
          player.current.start();
          player.current.loop = true;
        } catch (error) {
          console.error("Error with audio playback:", error);
        }
      }
    };

    loadAndPlayAudio();

    return () => {
      if (player.current) {
        player.current.stop();
      }
    };
  }, [audioTrack]);

  useEffect(() => {
    const interval = setInterval(fetchGasAmount, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gas-tracker">
      <div className="image-container">
        <img src={imageSrc} alt="Gas Indicator" className="responsive-image" />
        <div className="overlay">
          <h2 style={overlayStyle}>{gasAmount}</h2>
          <button onClick={fetchGasAmount}>Check Gas and Play Audio</button>
        </div>
      </div>
      {/* Audio handling is done by Tone.js, no <audio> element needed */}
    </div>
  );
};

export default GasTracker;
