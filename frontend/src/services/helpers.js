export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const formatClock = (totalMilliseconds) => {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const randomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const alpha = 0.1;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const popularRadio = [
  "37i9dQZF1E4qz5vS55UCfv",
  "37i9dQZF1E4lpj4fb7A9Nr",
  "37i9dQZF1E4FhRRLh0mmxG",
  "37i9dQZF1E4qSGMS0LCDb5",
  "37i9dQZF1E4wmWec21cCcJ",
  "37i9dQZF1E4uKNAcTu4q5q",
  "37i9dQZF1E4wMmDGhc9aS2",
  "37i9dQZF1E4kpnm6PFddQq",
  "37i9dQZF1E4rm3VpkGRopl",
  "37i9dQZF1E4CuBuNYA6Ztj",
];
// doit etre dans un fichier helpers et tu les export et import ici
export const recommendedRadio = [
  "37i9dQZF1E4DA4NMMNMQ1j",
  "37i9dQZF1E4AJ7APsyMVAt",
  "37i9dQZF1E4nqrwpUzdAQS",
  "37i9dQZF1E4BbZOu2w1hAZ",
  "37i9dQZF1E4pXRMmtPF6Pg",
];
// doit etre dans un fichier helpers et tu les export et import ici
export const latinFavorite = [
  "37i9dQZF1DX8sljIJzI0oo",
  "37i9dQZF1DWVxf0LotrLLG",
  "37i9dQZF1DX1hVRardJ30X",
  "37i9dQZF1DX7qRKBHjmYIE",
  "37i9dQZF1DWZoF06RIo9el",
  "37i9dQZF1DX1QnNyJOBQBv",
  "37i9dQZF1DXdWmNjHAJIwP",
  "37i9dQZF1DWWWpEY2WZLnS",
  "37i9dQZF1DWY7IeIP1cdjF",
];