export class DatabaseService {
  constructor() {
    this.db = window.firebase.firestore();
  }

  get(path) {
    return new Promise(
      function(resolve, reject) {
        this.db
          .collection(path)
          .orderBy("order")
          .where("enabled", "==", true)
          .get()
          .then(snapshots => {
            let items = [];
            snapshots.forEach(s => {
              const data = s.data();
              const item = {
                id: s.id,
                title: data.title,
                description: data.description,
                url: data.url || null
              };
              items.push(item);
            });
            resolve(
              items.map((s, i, arr) => ({
                ...s,
                index: i,
                total: arr.length
              }))
            );
          })
          .catch(err => reject(err));
      }.bind(this)
    );
  }
}
