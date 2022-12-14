import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {nanoid} from 'nanoid'; 
import React, {useState, useEffect} from 'react';
import AddManga from './Compoents/AddManga';
import _ from 'lodash';
import Manga from './Compoents/Manga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {

// Some time later make manga to allManga so it won't be confusing
const [manga,setAllManga] = useState(null);
const [searchManga,setSearchManga] = useState(null);
const [keywords,setKeywords] = useState("");
const [mangaYear, setMangaYear] = useState("");


useEffect(() => {

  if (localStorage) {
    const mangaLocalStorage = JSON.parse(localStorage.getItem('mangaHope'));

    if (mangaLocalStorage) {
      saveManga(mangaLocalStorage);
    } else {
      saveManga(mangaAndCreator)
    }
  }
}, []);


const saveManga = (mangaHope) => {
  setAllManga(mangaHope);
  setSearchManga(mangaHope);
  if(localStorage) {
    // it my be manga or mangaHope I don't know anymore
    localStorage.setItem('mangaHope', JSON.stringify(mangaHope));
    console.log('saved to local storage');
  }
}

const addManga = (newManga) => {
  const updatedManga = [...manga, newManga];
  saveManga(updatedManga);
}


const searchMangaResults = () => {
  let keywordsArray = [];

  if (keywords) {
    keywordsArray = keywords.toLocaleLowerCase().split(' ');  
  }

  if (mangaYear) {
    keywordsArray.push(mangaYear.toString());
  }

  // Come back here later about mangaOfThePast if there is a problem 
  if (keywordsArray.length > 0) {
      const searchResults = manga.filter(mangaOfThePast => {
        for(const word of keywordsArray) {
          if (mangaOfThePast.name.toLocaleLowerCase().includes(word) || 
          mangaOfThePast.by.toLocaleLowerCase().includes(word) || 
          mangaOfThePast.mangaStart === parseInt(word)) {
            return true;
          }
        }
        return false;
      }); 
      setSearchManga(searchResults);
  } else {
    setSearchManga(manga);
  }
}

  const removeManga = (manaToDelete) => {
    console.table(manaToDelete);
    const updatedMangaArray = manga.filter(manga => manga.id !== manaToDelete.id);
    saveManga(updatedMangaArray);
  }

  const updateManga = (updatedManga) => {
    console.table(updatedManga);
    const updatedMangaArray = manga.map(manga => manga.id === updatedManga.id ? {...manga,...updatedManga } : manga);
    saveManga(updatedMangaArray);
  }

  const mangaAndCreator = [
    {id:nanoid(), name: 'JoJo Bizarre Adventure', by: 'Hirohiko Araki', image:'images/jojo.jpg', images:'images/Hirohiko Araki.jpg', mangaStart: 1987},

    {id:nanoid(), name: 'Deadman Wonderland', by: 'Jinsei Kataoka', image:'images/Deadman Wonderland.jpg', images:'images/Jinsei Kataoka.jpg', mangaStart: 2010},

    {id:nanoid(), name: 'Flcl', by: 'Kazuya Tsurumaki and Yōji Enokido', image:'images/Flcl.jpg', images:'images/Kazuya Tsurumaki.jpg', img:'images/Yōji Enokido.jpg', mangaStart: 2000},

    {id:nanoid(), name: 'Case Closed', by: 'Gosho Aoyama', image:'images/Case Closed.jpg', images:'images/Gosho Aoyama.jpg', mangaStart: 1994},

    {id:nanoid(), name: 'The way of a Househusband', by: 'Kousuke Oono', image:'images/The way of a Househusband.jpg', images:'images/Kousuke Oono.jpg', mangaStart: 2018},

    {id:nanoid(), name: 'Blue Exorcist', by: 'Kazue Kato', image:'images/Blue Exorcist.jpg', images:'images/Kazue Kato.jpg', mangaStart: 2009},

    {id:nanoid(), name: 'Letter Bee', by: 'Hiroyuki Asada', image:'images/Letter Bee.jpg', images:'images/Hiroyuki Asada.jpg', mangaStart: 2006},

    {id:nanoid(), name: 'Monster', by: 'Naoki Urasawa', image:'images/Monster.jpg', images:'images/Naoki Urasawa.jpg', mangaStart: 1994},

    {id:nanoid(), name: 'Berserk', by: 'Kentaro Miura and Kouji Mori', image:'images/Berserk.jpg', images:'images/Kentaro Miura.jpg', img:'images/Kouji Mori.jpg', mangaStart: 1989},

    {id:nanoid(), name: 'Pandora Hearts', by: 'Jun Mochizuki', image:'images/Pandora Hearts.jpg', images:'images/Jun Mochizuki.jpg', mangaStart: 2006},

    {id:nanoid(), name: 'Death Note', by: 'Tsugumi Ohba', image:'images/Death Note.jpg', images:'images/Tsugumi Ohba.jpg', mangaStart: 2003}
  ];

  return (
    <div className='container'>
      <div className='row' id="allManga">
        <h3>Current Manga</h3>
        {searchManga && searchManga.map((mangaShow) => 
        (
        <div className='col-md-2' key={mangaShow.name}>
        <Manga manga={mangaShow} removeManga={removeManga} updateManga={updateManga} />
      </div>)
        )}


      </div>
      {/* { !manga && <button type='button' className='btn btn-lg btn-success' onClick={() => saveManga(mangaAndCreator) }>Show Manga</button>} */}
      <AddManga addManga={addManga} />
      <div className='row mt-4' id='searchManga'>
        <h3>Manga Search</h3>
        <div className="col-md-4">
          <label htmlFor='txtKeywords'>Search by Name :</label>
          <input type="text" className='form-control' placeholder='Attack on Titans for a example' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
        </div>
        <div className="col-md-4">
          <select value={mangaYear} onChange={evt => setMangaYear(evt.currentTarget.value)} className='form-select'>
            <option value="">Select Year</option>
            {_(manga).map(mangaSelect => mangaSelect.mangaStart).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
          </select>
        </div>
        <div className="col-md-4">
          <button type='button' className='btn btn-primary' onClick={searchMangaResults}>Search Manga<FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
