// 🌐 Таржима объектлари
const translations = {
    en: {
        title: "National Navigation for Tajikistan",
        desc: "Quick access to mosques, shops, hospitals, and transport.",
        feat1: "Mosques",
        feat1desc: "Find nearby prayer places easily.",
        feat2: "Shops",
        feat2desc: "Halal stores, supermarkets, and more.",
        feat3: "Transport",
        feat3desc: "Plan your route using public transportation."
    },
    tj: {
        title: "Навигатсияи миллӣ барои Тоҷикистон",
        desc: "Масҷидҳо, мағозаҳо, беморхонаҳо ва нақлиёт дар як ҷо.",
        feat1: "Масҷидҳо",
        feat1desc: "Маконҳои наздики намозро осон пайдо кунед.",
        feat2: "Магозаҳо",
        feat2desc: "Магозаҳои ҳалол, супермаркетҳо ва бештар.",
        feat3: "Нақлиёт",
        feat3desc: "Роҳи худро тавассути нақлиёти ҷамъиятӣ банақша гиред."
    },
    ru: {
        title: "Национальная навигация для Таджикистана",
        desc: "Мечети, магазины, больницы и транспорт в одном месте.",
        feat1: "Мечети",
        feat1desc: "Легко находите ближайшие места для молитвы.",
        feat2: "Магазины",
        feat2desc: "Халал-магазины, супермаркеты и другое.",
        feat3: "Транспорт",
        feat3desc: "Планируйте маршрут на общественном транспорте."
    }
};

// 🌐 Тилни ўзгартириш функцияси
function changeLang(lang) {
    document.getElementById('hero-title').textContent = translations[lang].title;
    document.getElementById('hero-desc').textContent = translations[lang].desc;
    document.getElementById('feat1-title').textContent = "🕌 " + translations[lang].feat1;
    document.getElementById('feat1-desc').textContent = translations[lang].feat1desc;
    document.getElementById('feat2-title').textContent = "🛍️ " + translations[lang].feat2;
    document.getElementById('feat2-desc').textContent = translations[lang].feat2desc;
    document.getElementById('feat3-title').textContent = "🚌 " + translations[lang].feat3;
    document.getElementById('feat3-desc').textContent = translations[lang].feat3desc;
}

// 🗺️ Тожикистон учун Leaflet харитаси
const map = L.map('map', {
    maxBounds: [
        [36.5, 66.0],  // Janubiy-g'arbiy чекка
        [41.5, 75.0]   // Shimoliy-sharqiy чекка
    ],
    maxBoundsViscosity: 1.0
}).setView([38.8610, 69.3451], 7);

// 🗺️ Картага тайл қабати қўшиш
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
// Тожикистон GeoJSON маълумоти
const tajikistanGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Tajikistan" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [67.82999962755952,37.144994004864685],
          [68.39203250516596,38.15702525486874],
          [68.17602501818592,38.901553453113905],
          [67.44221967964131,39.140143541005486],
          [67.70142866401736,39.58047842056453],
          [68.53641645698943,39.53345286717894],
          [69.0116329283455,40.08615814875667],
          [69.32949466337283,40.72782440852485],
          [70.66662234892505,40.960213324541414],
          [70.45815962105962,40.49649485937029],
          [70.60140669137269,40.21852733007229],
          [71.01419803252017,40.24436554621823],
          [70.64801883329997,39.93575389257117],
          [69.55960981636852,40.10321137141298],
          [69.46488691597753,39.5266832545487],
          [70.54916181832562,39.6041979029865],
          [71.784693637992,39.27946320246437],
          [73.6753792662548,39.4312368841056],
          [73.92885216664644,38.50581533462274],
          [74.25751427602273,38.60650686294345],
          [74.86481570831683,38.3788463404816],
          [74.8299857929521,37.9900070257014],
          [74.98000247589542,37.419990139305895],
          [73.9486959166465,37.4215662704908],
          [73.26005577992501,37.495256862939],
          [72.63688968291729,37.047558091778356],
          [72.1930408059624,36.948287665345674],
          [71.8446382994506,36.73817129164692],
          [71.44869347523024,37.06564484308052],
          [71.54191775908478,37.905774441065645],
          [71.23940392444817,37.953265082341886],
          [71.34813113799026,38.25890534113216],
          [70.80682050973289,38.486281643216415],
          [70.3763041523093,38.13839590102752],
          [70.27057417184014,37.735164699854025],
          [70.11657840361033,37.58822276463209],
          [69.51878543485796,37.60899669041342],
          [69.19627282092438,37.15114350030743],
          [68.85944583524594,37.344335842430596],
          [68.13556237170138,37.02311513930431],
          [67.82999962755952,37.144994004864685]
        ]]
      }
    }
  ]
};



// OpenStreetMap плиткалари
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);



// Ташқи GeoJSON файлини юклаш (у билан бирга бўлиши керак)
fetch('gadm41_TJK_3.json')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#ff6600",
        weight: 1,
        fillColor: "#ffcc99",
        fillOpacity: 0.05
      },
      onEachFeature: function (feature, layer) {
        // Ҳудуд номи pop-up сифатида
        layer.bindPopup(`<strong>${feature.properties.NAME_3 || "No name"}</strong>`);
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON load error:", err));

let placesData = [];

fetch('places.json')
  .then(res => res.json())
  .then(data => {
    placesData = data;

    data.forEach(place => {
      const invisibleLayer = L.circleMarker([place.lat, place.lon], {
        radius: 0,
        opacity: 0
      }).addTo(map);

      invisibleLayer.bindPopup(`
        <strong>${place.name}</strong><br>
        <em>${place.type}</em><br>
        ${place.description}<br><br>
        📍 <strong>Address:</strong> ${place.address}<br>
        📞 <strong>Contact:</strong> ${place.contact}<br>
        🌐 <a href="${place.website}" target="_blank">Website</a>
      `);

      place._layer = invisibleLayer;
    });
  });

// Автоматик тавсияларни кўрсатиш
function showSuggestions() {
  const input = document.getElementById('searchBox').value.toLowerCase();
  const suggestions = document.getElementById('suggestions');
  suggestions.innerHTML = '';

  if (input.length < 1) return;

  const matches = placesData.filter(p => p.name.toLowerCase().includes(input));

  matches.slice(0, 10).forEach(match => {
    const div = document.createElement('div');
    div.textContent = match.name;
    div.style.padding = "5px";
    div.style.cursor = "pointer";
    div.onmouseover = () => div.style.background = "#f0f0f0";
    div.onmouseout = () => div.style.background = "#fff";

    div.onclick = () => {
      map.flyTo([match.lat, match.lon], 16);
      match._layer.openPopup();
      document.getElementById('searchBox').value = '';
      suggestions.innerHTML = '';
    };

    suggestions.appendChild(div);
  });
}
