if (Users.find().count() == 0) {
    Users.insert({
        name: "admin",
        email: 'admin@example.com',
        password: '$2a$10$CrEJiLF5OoK/D.FgBs8Wc.Kr0C0KZaxWwOJwlYI4P98wjHP9BzXnK'
    });
}