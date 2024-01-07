import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
    getData() {
        return [
            // {
            //     itemImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649410/foto1_ohg1no.jpg',
            //     thumbnailImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649880/foto1s_anyr29.png',
            //     alt: 'Description for Image 1',
            //     title: 'Title 1'
            // },
            {
                itemImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649410/foto2_asr6y4.jpg',
                thumbnailImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649880/foto2s_s8bzpb.png',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649410/foto5_q4wmt9.jpg',
                thumbnailImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649880/foto5s_oa9wde.png',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649411/foto3_w0cvyf.jpg',
                thumbnailImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649880/foto3s_mspa31.png',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649411/foto4_euu5bl.jpg',
                thumbnailImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649880/foto4s_t1murb.png',
                alt: 'Description for Image 5',
                title: 'Title 5'
            },
            {
                itemImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649411/foto6_stcnul.jpg',
                thumbnailImageSrc: 'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1704649881/foto6s_kr7lhu.png',
                alt: 'Description for Image 6',
                title: 'Title 6'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};