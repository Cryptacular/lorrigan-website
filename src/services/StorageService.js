export class StorageService {
  constructor() {
    this.firebaseStorage = window.firebase.storage();
  }

  get(path) {
    return new Promise(
      function(resolve, reject) {
        const ref = this.firebaseStorage.ref(path);
        ref
          .getDownloadURL()
          .then(url => {
            fetch(url)
              .then(res => resolve(res))
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }.bind(this)
    );
  }
}
