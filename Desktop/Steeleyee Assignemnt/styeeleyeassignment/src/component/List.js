import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {

  const handleClick = () => {
    onClickHandler(index);
  };

  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red', color:"white",fontSize:"1.5rem"}}
      onClick={handleClick}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  const propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
    })),
  };

  PropTypes.checkPropTypes(propTypes, { items }, 'prop', 'WrappedListComponent');

  return (
    <ul style={{ textAlign: 'left' }}>
      {items && items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex===index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: [{text: "Pankaj"},{text:"Prithvi"},{text:"Kamal"}],
};

const List = memo(WrappedListComponent);

export default memo(List);
