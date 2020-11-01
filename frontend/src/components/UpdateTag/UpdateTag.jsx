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
import DeleteTag from '../DeleteTag/DeleteTag';

const animatedComponents = makeAnimated();

function UpdateTag(props) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setTags(props.tags.tags);
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
      <DeleteTag />
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
