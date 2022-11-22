import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost, setAlert } from "../redux/reducer";
import "../style.scss";

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [fileName, setFileName] = useState("");

  const alert = useSelector((state) => state.alert.alert);

  const setImgSrc = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setImg(url);
  };

  const publishPost = () => {
    if (!title) {
      dispatch(setAlert("Please Add Blog Title"));
      return;
    } else if (!desc) {
      dispatch(setAlert("Please Add Blog Description"));
      return;
    } else if (!img) {
      dispatch(setAlert("Please Upload An Image For Blog"));
      return;
    }
    dispatch(addPost({ title: title, desc: desc, img: img }));
    dispatch(setAlert("You Blog Is Published Successfully"));
    navigate("/");
  };

  return (
    <div className='create-post'>
      <div className='container'>
        <div className='section-1'>
          <div className='title'>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='desc'>
            <ReactQuill
              className='editor'
              theme='snow'
              value={desc}
              onChange={(e) => setDesc(e)}
            />
          </div>
        </div>
        <div className='section-2'>
          <div className='sub-section-2'>
            <h3>Category</h3>
            <div className='cat'>
              <input type='radio' name='cat' value='art' id='art' />
              <label htmlFor='art'>Art</label>
            </div>
            <div className='cat'>
              <input type='radio' name='cat' value='science' id='science' />
              <label htmlFor='science'>Science</label>
            </div>
            <div className='cat'>
              <input type='radio' name='cat' value='tech' id='tech' />
              <label htmlFor='tech'>Technology</label>
            </div>
            <div className='cat'>
              <input type='radio' name='cat' value='design' id='design' />
              <label htmlFor='design'>Design</label>
            </div>
            <div className='cat'>
              <input type='radio' name='cat' value='food' id='food' />
              <label htmlFor='food'>Food</label>
            </div>
          </div>
          <div className='sub-section-1'>
            <h3>Publish</h3>
            <div className='status'>
              <b>Status: </b>Draft
            </div>
            <div className='visibility'>
              <b>Visibility: </b>Public
            </div>
            <div className='upload-img'>
              <label htmlFor='my-file' style={{ cursor: "pointer" }}>
                <b>Upload Img:</b>📂 {fileName}
              </label>
              <input
                style={{ display: "none" }}
                type='file'
                id='my-file'
                name='file'
                accept='image/*'
                onChange={(e) => setImgSrc(e)}
              />
            </div>
            <div className='buttons'>
              {/* <button>Save Draft</button> */}
              <button onClick={() => publishPost()}>Publish</button>
            </div>
          </div>
        </div>
        {alert && (
          <div className='alert'>
            <h2>Alert!</h2>
            <hr />
            <p>{alert}</p>
            <hr />
            <button onClick={() => dispatch(setAlert(""))}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
