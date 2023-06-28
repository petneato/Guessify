// const fs = require('fs');
import data from '../testPlaylist.json';
function View(json) {  
  
  //The below implementation utilize JSX which can only be run on a server
  // let data;
  // fetch('C:\\Users\\alecm\\Desktop\\GuessifySProj\\Client\\src\\testPlaylist.json')
  //   .then(response => response.json())
  //   .then(json => {
  //       data = json;
  //       console.log(data);
  //   })
  //   .catch(error => console.error('Error:', error));
  
  //   console.log(data);

  //This implementation uses native JavaScript which should run on a server or in a single compile
  // fs.readFile('C:\\Users\\alecm\\Desktop\\GuessifySProj\\Client\\src\\testPlaylist.json', 'utf-8', (err, data) => {
  //   if (err) {
  //       console.error('Error:', err);
  //       return;
  //   }


  // let listName = jsonData.name;
  // console.log(listName);

  // let listImgUrl = jsonData.image[0].url;

  // let listId = jsonData.id;

  // });

  let listName = data.name;
  let listImg = data.images[0].url;
  
  return (
    <div className="Super">
      {/* <h1>{listImg}</h1> */}
      <header className="App-header">
        <h1>Select a Playlist</h1>
      </header>

      <body>
        <form>
          <div className='lstCard'>
            <img href={listImg} alt='Playlist Cover Image'></img>
            <h5 className='lstName'>{listName}</h5>
            <button className='selBtn'>Select</button>
          </div>
        </form>
      </body>
    </div>
  );
}
