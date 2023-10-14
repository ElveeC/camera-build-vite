export const calculateFirstPageInSlice = (currentPage: number, buttonsPerPageCount: number) => {
  let firstPageInSlice = 1;
  if (currentPage > buttonsPerPageCount) {
    switch (currentPage % buttonsPerPageCount) {
      case 0:
        firstPageInSlice = currentPage - 2;
        break;
      case 1:
        firstPageInSlice = currentPage;
        break;
      case 2:
        firstPageInSlice = currentPage - 1;
        break;
    }
  }

  return firstPageInSlice;
};

export const calculateButtonsToShowCount = (currentSliceNumber: number, sliceCount: number, pageCount: number, buttonsPerPageCount: number) => {

  let buttonsToShowCount = buttonsPerPageCount;
  if (currentSliceNumber === sliceCount && pageCount % buttonsPerPageCount) {
    buttonsToShowCount = pageCount % buttonsPerPageCount;
  }
  return buttonsToShowCount;
};

export const calculateCurrentSliceNumber = (currentPage: number, buttonsPerPageCount: number) => {
  let currentSliceNumber = currentPage / buttonsPerPageCount;
  if (currentPage < buttonsPerPageCount || currentPage % buttonsPerPageCount) {
    currentSliceNumber = Math.floor(currentPage / buttonsPerPageCount) + 1;
  }
  return currentSliceNumber;
};
