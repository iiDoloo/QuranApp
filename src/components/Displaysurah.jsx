import { useState, useEffect } from "react";

const Displaysurah = (props) => {
  const [surah, setSurah] = useState("");
  const [userData, setUserData] = useState({ name: '' });

  useEffect(() => {
    fetch(`http://api.alquran.cloud/v1/surah/${props.number}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSurah(data.data);
      });
  }, [props.number]);

  useEffect(() => {
    const userName = localStorage.getItem('username');
    if (userName) {
      setUserData({ name: userName });
    }
  }, []);

  const handelAyahClick = async (ayahN) => {
    console.log(ayahN);
    let audio = new Audio(`https://cdn.islamic.network/quran/audio/64/ar.alafasy/${ayahN}.mp3`);
    audio.play();
    
    try {
      const response = await fetch("http://localhost/QURANPROJ/track.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(userData),
      });
      const result = await response.json();
      if (result.status === "success") {
        console.log("Registration Successful");
      } else {
        console.log("Registration Failed Please Try Again!");
      }
    } catch (error) {
      console.log("Server Error Please Try Again Later");
    }
  };

  return (
    <>
      <h2 className="text-center mb-2">Happy reading </h2>
      <h2 className="text-center mb-5">{surah.name} {props.number}</h2>
      <div className="quran">
        {Object.keys(surah).length > 0 ? 
        <div className="surah-list"> 
          {surah.ayahs.map(ayah => (
            <p 
              className="quran text-lg hover:text-indigo-500 " 
              key={ayah.number} 
              onClick={() => handelAyahClick(ayah.number)}
            >
              {ayah.text} 
              <div className="ayah-container">
                <span className="ayah-number">{ayah.numberInSurah}</span>
              </div>
            </p>
          ))}
        </div> 
        : null}
      </div>
    </>
  );
};

export default Displaysurah;
