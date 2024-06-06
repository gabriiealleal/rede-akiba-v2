import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { usePost } from '@/services/posts/queries';
import ImagemEmDestaqueDaMateriaLoading from "@/interfaces/private/placeholders/materias/ImagemEmDestaqueDaMateriaLoading";

const ImagemEmDestaqueDaMateria = () => {
    const [preview, setPreview] = useState<string | undefined>(undefined);

    const { slug } = useParams();
    const { data: getPost, isLoading } = usePost(slug ?? "");
    const postagem = getPost?.publicação;

    if(slug){
        if(isLoading){
            return <ImagemEmDestaqueDaMateriaLoading />
        }
    }

    const previewDaImagem = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imagem = event.target.files?.[0];

        if (imagem) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreview(fileReader.result as string);
            }
            fileReader.readAsDataURL(imagem);
        } else {
            setPreview(undefined);
        }
    }

    return (
        <div>
            <span className="font-averta font-extrabold text-laranja text-lg uppercase italic">Imagem em destaque</span>
            <label htmlFor="imagem_destaque" className='bg-aurora h-64 flex items-center justify-center rounded-md cursor-pointer'>
                {
                    preview ?
                        <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-md border-2 border-aurora bg-aurora" /> :
                    postagem?.featured_image ?
                            <img src={postagem?.featured_image} alt="Preview" className="h-full w-full object-cover rounded-md border-2 border-aurora bg-aurora" /> :
                            <span className="font-averta font-extrabold uppercase italic text-azul-claro text-8xl pb-2.5">+</span>
                }
            </label>
            <input type="file" id="imagem_destaque" name="imagem_destaque" className="hidden" onChange={previewDaImagem} />
        </div>
    );
}

export default ImagemEmDestaqueDaMateria;