import logo from './logo.svg';
import './App.css';
import {Flex,Box,Text} from '@chakra-ui/layout';
import { Button, Image ,Heading, Stack} from '@chakra-ui/react';
import { useState } from 'react';
const App=()=>{

  const [gameStarted, setGameStarted]=useState(false);
  const [selectedNumber,setSelectedNumber]=useState();
  const [dice,setDice]=useState(1);
  const [error,setError]=useState(null);
  const [score,setScore]=useState(0);


  const numbers=[1,2,3,4,5,6]

  const startGameHandler=()=>{
    setGameStarted(true);
  }

  const onNumberClicked = (value) =>{
    setSelectedNumber(value);
  }

  const genRandomNumber=()=>{
    if(selectedNumber){
      const generatedNo=Math.ceil(Math.random()*6);
      setDice(generatedNo);

      if(selectedNumber===generatedNo){
        setScore((prev)=>prev+generatedNo);
      }
      else{
        setScore((prev)=>prev-2)
      }
    }
    else{
      setError("please Select number")
    }
    
  }

  return (
    <>
      { gameStarted ? (
        <>
        <Stack justify="center" align="center" maxW="1300px" mx="auto" h="100vh">
          <Heading as="h1" color= {error ? "red" :"black"}>
            {error ? error: "select number"}
          </Heading>
          <Flex>
            {
              numbers.map((value)=>(
                <Flex justify="center" 
                  font-size="2x1" 
                  h="50px" w="50px" 
                  bg={selectedNumber===value?'green':'black'}
                   color="white" 
                  key={value}
                  mr={4}
                  borderRadius="md"
                  onClick={()=>{
                    onNumberClicked(value);
                  }}
                >
                  {value}
                </Flex>
              ))}
          </Flex>
          <Box h="150px" width="150px" onClick={genRandomNumber}>
            <Image src={`./dice/dice${dice}.png`}></Image>
          </Box>
          <Text as="p" fontSize="x1">Click on dice to roll</Text>

          <Text color={score>=0?'green':'red'} fontSize="8x1" fontWeight="bold">{score}</Text>
          <Text fontSize="6x1" fontWeight="bold">Total Score</Text>
          <Button onClick={()=>setScore(0)}>Reset Score</Button>
          
        </Stack>
        
      </>
        
      ): (
        <Flex justify="center" align="center">
          <Image width="50%" src="./dices.jpg" />
          <Stack>
            <Heading fontsize="7x1" as="h1">
              {""}
              The Dice Game
            </Heading>
            <Button alignSelf="flex-end" bg="black" color="white" _hover={{bg:"grey"}} onClick={startGameHandler}>Start Game</Button>
          </Stack>
        </Flex>
        )
      }
      
    </>
  )
}

export default App;
