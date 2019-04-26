
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson, people);
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
 

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    // DONE: TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    displayPeople(findChildren(person, people))
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // DONE: TODO: find the person using the name they entered
  return foundPerson[0];
}

function searchByTrait(people){
  var eyeColor = promptFor("what is the person's eyecolor?");
  var height = promptFor("What is the person's height?");
  var weight = promptFor("what is the person's weight?"); 
  var occupation = promptFor("what is the person's occupation");  
  var gender = promptFor("what is the person's gender?"); 

  var foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor && person.height === height && person.weight == weight && person.occupation == occupation && person.gender == gender){
      return true;
    }
    else{
      return false;
    }
  })
  // DONE: TODO: find the person using the name they entered
  return foundPerson[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation;
  // DONE: TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function findChildren(person, people){
  var foundChildren = people.filter(function(potentialChild){
    if (potentialChild.parents.includes(person.id)){
      return true;
      }
      else{
      return false;
      }
  });
    for (let i = 0; i < foundChildren.length; i++){
      let potentialGrandChild = findChildren(foundChildren[i], people);
      if (potentialGrandChild.length > 0){
          foundChildren.push(potentialGrandChild[0]);
        }
      }
  return foundChildren;
}


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
