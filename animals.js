//animals that the user needs to guess
const words = [
    {
        name: "Alpaca",
        hint1: "It is a land animal",
        hint2: "It is related to the llama",
        img: "https://www.henryvilaszoo.gov/wp-content/uploads/Alpacas.png"
    },

    {
        name: "Shark",
        hint1: "It swims in the ocean",
        hint2: "It is a predator",
        img: "https://cdn.britannica.com/79/65379-050-5CF52BAC/Shortfin-mako-shark-seas.jpg?w=300"
    },

    {
        name: "Cat",
        hint1: "We keep it as a pet",
        hint2: "It is known for being independent",
        img: "https://t4.ftcdn.net/jpg/00/97/58/97/240_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
    },

    {
        name: "Dog",
        hint1: "We keep it as a pet",
        hint2: "It is very loyal",
        img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        name: "Whale",
        hint1: "It swims in the ocean",
        hint2: "It is typically very large",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7F6lpf0gR1jRKI3dK9ll4gcGZjYWahRB9YEKAQkT0K-qwv5FkkztV0c&s"
    },

    {
        name: "Fish",
        hint1: "It swims in the ocean",
        hint2: "It has gills",
        img: "https://images.stockcake.com/public/1/9/4/194f4315-a8d9-422b-b237-18b1e224b7a1_large/colorful-tropical-fish-stockcake.jpg"
    },
    
    {
        name: "Zebra",
        hint1: "It lives in Africa",
        hint2: "It has stripes",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/96/Plains_Zebra_Equus_quagga_cropped.jpg"
    },

    {
        name: "Bonobo",
        hint1: "It lives in Africa",
        hint2: "It is closely related to the chimpanze",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Apeldoorn_Apenheul_zoo_Bonobo.jpg/960px-Apeldoorn_Apenheul_zoo_Bonobo.jpg"
    },

    {
        name: "Horse",
        hint1: "It walks on four legs",
        hint2: "It parnered humans for centuries",
        img: "https://upload.wikimedia.org/wikipedia/commons/d/de/Nokota_Horses_cropped.jpg"
    },

    {
        name: "Budgie",
        hint1: "We keep it as a pet",
        hint2: "It flies",
        img: "https://avonturia.nl/wp-content/uploads/2024/05/Grasparkiet-Grasparkieten-Parkieten-Soorten-parkietensoorten-kleine-parkiet-Melopsittacus-undulatus-populair-1-1024x1024.jpg"
    },

    {
        name: "Raccoon",
        hint1: "It is a mammal",
        hint2: "It has a face that looks like it is wearing a mask",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Raccoon_in_Central_Park_%2835264%29.jpg/250px-Raccoon_in_Central_Park_%2835264%29.jpg"
    },

    {
        name: "Lion",
        hint1: "It is a carnivore",
        hint2: "It lives in Africa",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lion_%28Panthera_leo%29_male_6y.jpg/500px-Lion_%28Panthera_leo%29_male_6y.jpg"
    },
    
    {
        name: "Koala",
        hint1: "It lives in Australia",
        hint2: "They primarily eat eucalyptus leavs",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/330px-Koala_climbing_tree.jpg"
    },

    {
        name: "Bat",
        hint1: "It flies",
        hint2: "It is a mammal",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Big-eared-townsend-fledermaus.jpg/250px-Big-eared-townsend-fledermaus.jpg"
    },

    {
        name: "Turtle",
        hint1: "It is a reptile",
        hint2: "It lives on land and in the ocean",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Turtle_diversity.jpg/1280px-Turtle_diversity.jpg"
    }
]