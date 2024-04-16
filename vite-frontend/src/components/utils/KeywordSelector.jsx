import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const KeywordButton = ({ keyword, onClick, selected, showHelp }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (showHelp && keyword.tooltip) {
      setSnackbarMessage(`${keyword.text}: ${keyword.tooltip}`);
      setSnackbarOpen(true);
    } else {
      onClick();
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`rounded-md px-2 py-1 mx-1 border ${selected ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
        title={keyword.tooltip}
      >
        {keyword.text}
      </button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="info" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export const KeywordSelector = ({ keywords, onKeywordSelect, showHelp }) => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [categoryArrays, setCategoryArrays] = useState([]);

  useEffect(() => {
    const tempCategoryArrays = {};
    // Step 1: Categorize and sort keywords
    keywords.forEach((keyword) => {
      // Set missing or faulty fields for the keyword
      keyword.categoryId = keyword.categoryId || 999; // Replace undefined or null with 999
      keyword.category = keyword.category || 'Other'; // Replace undefined or null with 'Other'
      keyword.priority = keyword.priority || 999; // Replace undefined or null with 999

      // Create an array for the categoryId if it doesn't exist
      if (!tempCategoryArrays[keyword.categoryId]) {
        tempCategoryArrays[keyword.categoryId] = [];
      }

      // Push the keyword to the corresponding category array
      tempCategoryArrays[keyword.categoryId].push(keyword);
    });

    // Step 2: Sort the arrays by categoryId and priority
    const sortedArrays = Object.values(tempCategoryArrays).map((array) => {
      return array.sort((a, b) => {
        if (a.categoryId !== b.categoryId) {
          return a.categoryId - b.categoryId;
        } else {
          return a.priority - b.priority;
        }
      });
    });

    // Update the state with the sorted arrays
    setCategoryArrays(sortedArrays);
  }, [keywords]);

  const handleKeywordClick = (keywordText) => {
    let updatedKeywords;
    if (selectedKeywords.includes(keywordText)) {
      updatedKeywords = selectedKeywords.filter((k) => k !== keywordText);
    } else {
      updatedKeywords = [...selectedKeywords, keywordText];
    }
    setSelectedKeywords(updatedKeywords);
    onKeywordSelect(updatedKeywords); // Pass the updatedKeywords array to the parent component
  };

  return (
    <div>
      {categoryArrays.map((categoryArray) => (
        <div key={categoryArray[0].categoryId}>
          <h3>{categoryArray[0].category}</h3>
          {categoryArray.map((keyword) => (
            <KeywordButton
              showHelp={showHelp}
              key={keyword._id}
              keyword={keyword}
              onClick={() => handleKeywordClick(keyword.text)}
              selected={selectedKeywords.includes(keyword.text)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeywordSelector;
