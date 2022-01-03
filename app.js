const siswaList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
let kelasTi = [];

searchBar.addEventListener('keyup',(e)=>{
  // Menerima inputan melaui form pencarian kemudian hurufnya diubah menjadi lowercase
    const searchString = e.target.value.toLowerCase();
    
    const filteredSiswa = kelasTi.filter((siswa) =>{
         return siswa.nama.toLowerCase().includes(searchString);
    })
     displaySiswa(filteredSiswa);

})  

// Proses membaca data mahasiswa melalui database
const loadSiswa = async () => {
  try {
    const res = await fetch(
      "https://mocki.io/v1/502d7622-4aa7-4a1f-924f-e265c6cf8c5c"
    );
    // Kemudian respon dalam bentuk object dari database di masukkan dalam array kelaTi 
    kelasTi = await res.json();
    // Jika tidak ada respon akan keluar error
    displaySiswa(kelasTi);
  } catch (err) {
    console.error(err);
  }
};

// Kemudian data yang sudah di load akan ditampilkan berdasarkan nama siswa 
const displaySiswa = (siswas) => {
  const htmlString = siswas
    .map((siswa) => {
      return `
            <li class="character">
                <h2>${siswa.nama}</h2>
                <p>Nim: ${siswa.Nim}</p>
                <h4>Kelas: ${siswa.kelas}</h4>
            </li>
        `;
    })
    .join("");
  siswaList.innerHTML = htmlString;
};

loadSiswa();
