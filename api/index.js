const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabeticalChars = '';

        data.forEach(item => {
            if (!isNaN(item)) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabeticalChars += item;
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                 alphabets.push(item.toUpperCase());
                 alphabeticalChars += item;
            } else {
                special_characters.push(item);
            }
        });
        
        const reversedAlphabets = alphabeticalChars.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversedAlphabets.length; i++) {
            if (i % 2 !== 0) {
                concat_string += reversedAlphabets[i].toUpperCase();
            } else {
                concat_string += reversedAlphabets[i].toLowerCase();
            }
        }

        const user_id = "priyanshu_kanyal_29082025";

        const response = {
            is_success: true,
            user_id: user_id,
            email: "priyanshu.22bce7572@vitapstudent.ac.in",
            roll_number: "22BCE7572",
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({
            is_success: false,
            error: "An internal server error occurred."
        });
    }
});

// This line is for local development only. Vercel ignores it.
if (process.env.VERCEL_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Export the app for Vercel
module.exports = app;
