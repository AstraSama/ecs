# ecs
Login e Signup - User: {
 - nickname (se caso não infomar, pegar email como valor padrão)
 - email
 - password (criptografar - bcrypt)
}

CRUD - Post: {
 - text
 - User: Ref
}

Obs:

As funções de signup e login dos Users devem ser públicas, as funções de gerenciamento de Posts privadas;
O User do Post deve ser o próprio software quem o define, para não permitir outros Users criarem um Post em nome de outros.