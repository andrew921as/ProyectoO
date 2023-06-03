cons axios = require("axios");


jest.mock("axios");

const userDataLogin =
    [
        {
            email: "pepito@gmail.com",
            password: "pepito",
        }
    ]

const userDataRegister =
    [
        {
            name: "pepito@gmail.com",
            last_name: "pepito",
			email: "pepito@gmail.com",
            password: "pepito",
        }
    ]


test("post Login", async () => {
    axios.post.mockResolvedValue(`http://localhost:3001/users/login`,{ data: userDataLogin });
    //render(<Todos />);

    //const todoList = await waitFor(() => screen.findAllByTestId("todo"));

    //expect(todoList).toHaveLength(3);
});
test("post new user", async () => {
    axios.post.mockResolvedValue(`http://localhost:3001/users/register`,{ data: userDataRegister });
});

//const fizz_buzz = require('./jestTesting.js');

//describe("FizzBuzz", () => {
//    test('[3] should result in "fizz"', () => {
//        expect(fizz_buzz([3])).toBe('fizz');
//    });

//    test('[5] should result in "buzz"', () => {
//        expect(fizz_buzz([5])).toBe('buzz');
//    });

//    test('[15] should result in "fizzbuzz"', () => {
//        expect(fizz_buzz([15])).toBe('fizzbuzz');
//    });

//    test('[1,2,3] should result in "1, 2, fizz"', () => {
//        expect(fizz_buzz([3])).toBe('fizz');
//    });

//});
