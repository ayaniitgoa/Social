import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteTags } from '../../reduxSetup/actions/tagsActions';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './UpdateTag.css';
import {
  getTags,
  postSelectedTags,
} from '../../reduxSetup/actions/tagsActions';

const animatedComponents = makeAnimated();

function UpdateTag(props) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [deleteTags, setDeleteTags] = useState([]);

  useEffect(() => {
    setTags(props.tags.tags);
    // setUserTags(props.tags.selectedTags.tags);
  }, [props.tags]);

  const handleTagsChange = (selectedTag) => {
    setSelectedTags(selectedTag);
  };

  const handleTagsSubmit = (e) => {
    e.preventDefault();
    const selectedTagValues = [];
    selectedTags.map((tag) => selectedTagValues.push(tag._id));
    props.postSelectedTags({ selectedTagValues, id: props.user._id });
  };

  const handleDeleteTagSubmit = (e) => {
    e.preventDefault();
    const deletedTags = [];
    deleteTags.map((tag) => deletedTags.push(tag.id));
    props.deleteTags({
      deletedTags: deletedTags,
      id: props.user._id,
    });
  };

  return (
    <div>
      <form onSubmit={handleTagsSubmit}>
        <div className='' style={{ width: '40vw' }}>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={selectedTags}
            onChange={handleTagsChange}
            options={tags}
            isMulti
            placeholder='Choose Tags'
            noOptionsMessage={() => 'No tags found 😞 '}
          />
        </div>
        <button type='submit'>Submit Tags</button>
      </form>

      <form action='' onSubmit={handleDeleteTagSubmit}>
        {props.user.tags.length !== 0 &&
          props.user.tags.map((tag, i) => {
            return (
              <div className='' key={i}>
                {tag.value}
                <input
                  onClick={() => {
                    if (
                      !deleteTags.filter((t) => t.id === tag._id).length > 0
                    ) {
                      setDeleteTags([
                        ...deleteTags,
                        { id: tag._id, value: tag.value },
                      ]);
                      console.log(deleteTags);
                    } else {
                      var index = deleteTags.findIndex((t) => t.id === tag._id);

                      deleteTags.splice(index, 1);
                      console.log(deleteTags);
                    }
                  }}
                  type='checkbox'
                  name=''
                  id=''
                />
              </div>
            );
          })}
        <button type='submit'>Delete</button>
      </form>
      {/* <form onSubmit={handleDeleteTagSubmit}>
        {userTags
          ? userTags.map((tag, i) => {
              return (
                <div key={i} className=''>
                  <li>{tag}</li>
                  <input
                    onClick={() => {
                      if (!deleteTags.filter((t) => t === tag).length > 0) {
                        setDeleteTags([...deleteTags, tag]);
                        console.log(deleteTags);
                      } else {
                        var index = deleteTags.indexOf(tag);
                        deleteTags.splice(index, 1);
                        console.log(deleteTags);
                      }
                    }}
                    type='checkbox'
                    name=''
                    id=''
                  />
                </div>
              );
            })
          : null} */}
      {/* 
        <button type='submit'>Delete These Tags</button>
      </form> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tags: state.tag,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getTags,
  postSelectedTags,
  deleteTags,
})(UpdateTag);
