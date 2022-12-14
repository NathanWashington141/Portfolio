import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import './Manga.css';

function Manga(props) {

  const[editMode, setEditMode] = useState(false);
  const[name,setName] = useState("");
  const[by,setBy] = useState("");
  const[mangaStart,setAllMangaStart] = useState();

  useEffect(() => {
    setName(props.manga.name);
    setBy(props.manga.by);
    setAllMangaStart(props.manga.mangaStart);
  }, []);

  const saveManga = () => {
    setEditMode(false)
    const updatedManga = {name:name, by:by, mangaStart:mangaStart, id:props.manga.id, image:props.manga.image}
    props.updateManga(updatedManga);
  }

  return(
    <div className='card'>
      <img src={props.manga.image} alt='broken' />
          {!editMode && <ul className="list-group list-group-flush">
            <li className='list-group-item'>{props.manga.name}</li>
            <li className='list-group-item'>{props.manga.by}</li>
            <li className='list-group-item'>Started in {props.manga.mangaStart}</li>
            <button type="button" className="btn btn-danger" onClick={() => props.removeManga(props.manga)}>Delete Manga<FontAwesomeIcon icon={faWarning} /></button>
            <button type="button" className="btn btn-warning" onClick={()=> setEditMode(true)}>Edit <FontAwesomeIcon icon={faMagicWandSparkles} /></button>
          </ul>
}
{editMode && 
  <ul className="list-group list-group-flush">
            <li className='list-group-item'><input type="text" className="form-control" value={name} onChange={(evt) => setName(evt.currentTarget.value)} /></li>
            <li className='list-group-item'><input type="text" className="form-control" value={by} onChange={(evt) => setBy(evt.currentTarget.value)} /></li>
            <li className='list-group-item'>Started in <input type="text" className="form-control" value={mangaStart} onChange={(evt) => setAllMangaStart(evt.currentTarget.value)} /></li>
            <li className="list-group item"><button id='btnSave' className="btn btn-secondary" onClick={saveManga}>Save</button></li>
          </ul>
}
        </div>
  )};

export default Manga;