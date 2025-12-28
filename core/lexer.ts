// Lexer: convert the code in tokens

type TokenType = {
    NUMBER: "NUMBER", // 10, 3.14, 100...
    PLUS: "PLUS", // +
    LPAREN: "LPAREN"  // (
    RPAREN: "RPAREN" // )
    EOF: "EOF" // End of File
    NEWLINE: "NEWLINE" // \n
    VAR: "VAR" // keyword to creation of variable
    ID: "ID" // identification of keywords
    ASSIGN: "ASSIGN" // =
}

// The code "var x = 5" is converted to [VAR, ID("x"), ASSIGN, NUMBER("10")]
