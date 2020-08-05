import path from 'path';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'workbooks'),
    filename: (request, file, callback) => {
      const date = new Date();
      const fileName = `${String(date.getTime())}.xlsx`;

      callback(null, fileName);
    },
  }),
};
