flippers:
name: string
description: string
quote: string
price: Srtring
state: string
brand: IBrand
release_date: Date
grade: float
pictures[]: Images
new: bool
hearth: bool
aviability: string


marques:
name: string
description: string
logo: Image
flippers[]: Flippers

Images: 
path_file: String (base64)

Explication du model:

les flippers ont un nom avec un grande description et une citation. Il y a un prix -> string car il peut
etre "sur demande", l'état du flipper, il est lié a une marque de model IBrand.
Les images sont un tableau de IPictures. new et hearth correspondes aux petites annotations sur l'annonce.

Les marques ont un nom, une description, un logo qui est un IPicture et un tableau de flippers.

Les images contiennent simplement l'url et un nom.

