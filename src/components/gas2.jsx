import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import "./GasTracker.css";

const GasTracker = () => {
  const [gasAmount, setGasAmount] = useState(null);
  const [audioTrack, setAudioTrack] = useState("");
  const [imageSrc, setImageSrc] = useState(
    "https://arweave.net/u5YsxIo53bHlhNbtjZxaH1PSdKLTvY6Tm0dgZhulnp8"
  );
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
      if (Number.isNaN(safeGas)) {
        return;
      }
      setGasAmount(safeGas);
      determineTrackAndImage(safeGas);
    } catch (error) {
      console.error("Error fetching gas amount:", error);
    }
  };

  // Function to determine which audio track and image to use
  const determineTrackAndImage = (gas) => {
    if (gas < 20) {
      setAudioTrack(
        "https://arweave.net/QeijcRbWa-MoXVsoLqUBxBqPUbRs1o1Oas1Hifsdz9o"
      );
      setImageSrc(
        "https://arweave.net/u5YsxIo53bHlhNbtjZxaH1PSdKLTvY6Tm0dgZhulnp8"
      );
      setOverlayStyle({
        top: "39%",
        left: "50.2%",
        fontSize: "5vw",
      });
    } else if (gas < 40) {
      setAudioTrack(
        "https://arweave.net/di19Yc8HB_LtBwi4haU9pbVUb119hJ0gkUBrEOwkk2o"
      );
      setImageSrc(
        "https://arweave.net/u5YsxIo53bHlhNbtjZxaH1PSdKLTvY6Tm0dgZhulnp8"
      );
      setOverlayStyle({
        top: "39%",
        left: "50.2%",
        fontSize: "5vw",
      });
    } else if (gas < 60) {
      setAudioTrack(
        "https://arweave.net/IFRMOFeqLmKNMNVKsr17GuK98yX3MqNs6rgWU6j997k"
      );
      setImageSrc(
        "https://arweave.net/u5YsxIo53bHlhNbtjZxaH1PSdKLTvY6Tm0dgZhulnp8"
      );
      setOverlayStyle({
        top: "39%",
        left: "50.2%",
        fontSize: "5vw",
      });
    } else if (gas < 80) {
      setAudioTrack(
        "https://arweave.net/WwfQqLCDKkYmtlO0KRf1WPCxFl7YJkRYxrQ7d4wCZUA"
      );
      setImageSrc(
        "https://arweave.net/u5YsxIo53bHlhNbtjZxaH1PSdKLTvY6Tm0dgZhulnp8"
      );
      setOverlayStyle({
        top: "39%",
        left: "50.2%",
        fontSize: "5vw",
      });
    } else if (gas < 100) {
      setAudioTrack(
        "https://arweave.net/XtvvtzQ6LnUDY6d_aDtjg-4Nk4hP5_XmDLXvku6-bpk"
      );
      setImageSrc(
        "https://arweave.net/Bozp694I6gbxMuboxgkr6hAN4yzLL7vmoDg3ymfmHng"
      );
      setOverlayStyle({
        top: "36%",
        left: "52%",
      });
    } else if (gas < 200) {
      setAudioTrack(
        "https://arweave.net/OccYKwHO0J92XdEmpifyW1srGVnyVR7tGVjdnG3afJo"
      );
      setImageSrc(
        "https://arweave.net/Bozp694I6gbxMuboxgkr6hAN4yzLL7vmoDg3ymfmHng"
      );
      setOverlayStyle({
        top: "36%",
        left: "52%",
      });
    } else if (gas < 300) {
      setAudioTrack(
        "https://arweave.net/c1_YkYrNZipfaaxDfR_qqE5iMuamytY-MQ0lVaClmro"
      );
      setImageSrc(
        "https://arweave.net/Bozp694I6gbxMuboxgkr6hAN4yzLL7vmoDg3ymfmHng"
      );
      setOverlayStyle({
        top: "36%",
        left: "52%",
      });
    } else {
      setAudioTrack(
        "https://arweave.net/eIrrrUwkZQyQ_WTYeodrGk34XCgyS1fSO_hhWALMXIw"
      );
      setImageSrc(
        "https://arweave.net/Bozp694I6gbxMuboxgkr6hAN4yzLL7vmoDg3ymfmHng"
      );
      setOverlayStyle({
        top: "36%",
        left: "52%",
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
