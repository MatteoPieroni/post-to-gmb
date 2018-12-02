import { Storage } from "aws-amplify";

export function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  return new Promise((resolve, reject) => {
    Storage.put(filename, file, {
      ACL: 'public-read',
      contentType: file.type,
    }).then(result => resolve(result)).catch(err => reject(err));

    //const storedFile = await Storage.get(stored);
  })
};