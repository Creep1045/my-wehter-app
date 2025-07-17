import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';

// OpenWeather API Key를 여기에 입력하세요
const API_KEY = 'acac94710370fe588e9254cc3aaa582e';

function App() {
  // 입력된 도시 이름을 저장하는 state
  const [city, setCity] = useState("");
  // 날씨 정보를 저장하는 state
  const [weather, setWeather] = useState(null);
  // 에러 메시지를 저장하는 state
  const [error, setError] = useState("");

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = async () => {
    if (!city) return; // 입력값이 없으면 아무것도 하지 않음
    try {
      // OpenWeather API 호출 (단위: metric = 섭씨)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=kr`
      );
      if (!response.ok) {
        // 응답이 실패(404 등)면 에러 처리
        throw new Error('City not found');
      }
      const data = await response.json();
      // 날씨 정보 state에 저장 (아이콘 코드도 함께 저장)
      setWeather({
        city: data.name,
        temp: `${Math.round(data.main.temp)}°C`,
        desc: data.weather[0].description,
        icon: data.weather[0].icon // 아이콘 코드
      });
      setError(""); // 에러 메시지 초기화
    } catch (error) {
      // 잘못된 도시 입력 시 에러 메시지 표시
      setError('도시를 찾을 수 없습니다');
      setWeather(null);
    }
  };

  // OpenWeather 아이콘 URL 생성 함수
  const getIconUrl = (iconCode) =>
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <div className="app-container">
      {/* 도시 이름을 입력하는 input과 버튼을 그룹으로 묶음 */}
      <div className="search-group">
        <input
          type="text"
          placeholder="도시 이름을 입력하세요"
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }} // 엔터로도 검색 가능
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {/* 에러 메시지 표시 (있을 때만) */}
      {error && (
        <div style={{ color: 'red', marginBottom: 16, fontWeight: 'bold' }}>{error}</div>
      )}
      {/* 날씨 정보를 보여주는 부분 */}
      <div className="weather-info">
        {/* 날씨 정보가 있을 때만 표시 */}
        {weather && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={getIconUrl(weather.icon)}
              alt={weather.desc}
              style={{ width: 120, height: 120, marginBottom: 8 }}
            />
            <h2>{weather.city}</h2>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '8px 0' }}>{weather.temp}</p>
            <p>{weather.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
