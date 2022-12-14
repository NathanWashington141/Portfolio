import React, {useState} from "react";
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Addmanga.css';


function AddManga(props) {
  // name, by, image, images, img 
  const[name,setName] = useState("");
  const[by,setBy] = useState("");
  const[selectedFile,setSelectedFile] = useState();
  const[mangaStart,setAllMangaStart] = useState();

  const doWork = () => {
    const newManga = {"id":nanoid(), "name":name, "by":by, "image":URL.createObjectURL(selectedFile), "mangaStart": parseInt(mangaStart)};
    props.addManga(newManga);
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div className='row mt-5' id="addManga">
      <h3>Add Manga</h3>
    <div className="col-md-2">
      <label htmlFor="txtName" className="form-label">Manga Name :</label>
      <input type="text" id="txtName" placeholder="Manga Name" className="form-control" onChange={(evt) => setName(evt.currentTarget.value)} value={name} />
    </div>
    <div className="col-md-2">
      <label htmlFor="txtBy" className="form-label">Publisher Name :</label>
      <input type="text" id="txtBy" placeholder="Name of the Publisher" className="form-control" onChange={(evt) => setBy(evt.currentTarget.value)} value={by} />
    </div>
    <div className="col-md-2">
      <label htmlFor="txtStart" className="form-label">When did the Manga Start :</label>
      <input type="text" id="txtStart" placeholder="2005 for a example" className="form-control" onChange={(evt) => setAllMangaStart(evt.currentTarget.value)} value={mangaStart} />
    </div>
    <div className="col-md-2">
      <label htmlFor="fileUpload" className="form-label">Manga Image</label>
      <input type="file" name="file" id="fileUpload" onChange={imageUpdate} />
    </div>
    <div className="col-md-4">
      <button type="button" id="btnAddManga" className="btn btn-success btn-lg" onClick={doWork}>Add Manga<FontAwesomeIcon icon={faPlusCircle} /></button>
    </div>
    </div>
  );

}

export default AddManga;