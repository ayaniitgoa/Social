import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteTags } from '../../reduxSetup/actions/tagsActions';

function DeleteTag(props) {
  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {
    setSelectedTag(
      props.user.tags.map((tag, i) => {
        return {
          select: false,
          id: tag._id,
          value: tag.value,
        };
      })
    );
  }, [props.user]);

  const deleteTags = (e) => {
    e.preventDefault();
    let deleteTag = [];
    selectedTag.map((tag, i) => {
      return tag.select && deleteTag.push(tag.id);
    });
    console.log(deleteTag);
    props.deleteTags({ deletedTags: deleteTag, id: props.user._id });
  };

  return (
    <div>
      <form action='' onSubmit={deleteTags}>
        {selectedTag.map((tag, i) => {
          return (
            <div className='' key={tag.id}>
              <input
                type='checkbox'
                value={tag.select}
                name=''
                id=''
                onChange={(e) => {
                  let checked = e.target.checked;
                  setSelectedTag(
                    selectedTag.map((t) => {
                      if (tag.id === t.id) {
                        t.select = checked;
                      }
                      return t;
                    })
                  );
                }}
              />
              <p>{tag.value}</p>
            </div>
          );
        })}
        <button type='submit'>Delete Tags</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteTags })(DeleteTag);
