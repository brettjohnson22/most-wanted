
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
      var foundPerson = searchByTrait(people);
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
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();

  switch(displayOption){
    case "info":
      displayPerson(person);
      // DONE: TODO: get person's info
      break;
    case "family":
      displayFamily(person, people);
      // DONE: TODO: get person's family
      break;
    case "descendants":
      displayDescendants(person, people);
      // DONE: TODO: get person's descendants
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
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  var foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}


function searchByTrait(people){
  var searchTrait = promptFor("Enter what trait you would like to search for: 'eye color', 'height', 'weight', 'occupation', or 'gender'.\n Type the option you want or 'quit'", chars).toLowerCase();
    switch(searchTrait){
    case "eyecolor":
    case "eye color":
    case "eye":
    case "color":
    searchTrait = "eyeColor"
    var traitValue = promptFor("What is the person's eye color?", chars);
    break;
    case "height":
    var traitValue = promptFor("What is the person's height in inches?", chars);
    break;
    case "weight":
    var traitValue = promptFor("What is the person's weight?", chars);
    break;
    case "occupation":
    case "job":
    searchTrait = "occupation"
    var traitValue = promptFor("What is the person's occupation?", chars);
    break;
    case "gender":
    case "sex":
    searchTrait ="gender"
    var traitValue = promptFor("What is the person's gender?", maleFemale);
    break;
    case "quit":
      return;
    default:
    return searchByTrait(people);
    }
  
  var candidates = people.filter(function(person){
    if (traitValue == person[searchTrait]){
      return true;
    }
    else{
      return false;
    }
  })
  if (candidates.length == 1){
    let foundPerson = candidates[0];
    mainMenu(foundPerson, people);
    }
  else if (candidates.length > 1){
    let keepGoing = promptFor("Search Returned " + candidates.length + " results.\n" + grabFullNamesLineBreaks(candidates) + "\n\nSearch by another trait?\n Enter 'yes' to search again or 'no' to search by name.", yesNo);
    switch(keepGoing){
      case "yes":
        candidates = searchByTrait(candidates);
        return candidates;
        break;
      case "no":
        var foundPerson = searchByName(people);
        mainMenu(foundPerson, people);
        break;
    }
    }
  else{
    alert("Could not find that individual.");
    return app(people);
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

//only works on arrays, not objects. But it does work on an array containing a single object.
function grabFullNames(people){
  let peopleToDisplay = people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join(" & ");
  return peopleToDisplay;
}

function grabFullNamesLineBreaks(people){
  let peopleToDisplay = people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n");
  return peopleToDisplay;
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Age: " + getAge(person.dob) + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation;
  // DONE: TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayFamily(person, people){
  var personFamily = person.firstName + " " + person.lastName + "'s Family:\nSpouse: " + grabFullNames(findSpouse(person, people)) + "\n";
  personFamily += "Children: " + grabFullNames(findChildren(person, people)) + "\n";
  personFamily += "Parents: " + grabFullNames(findParents(person, people)) + "\n";
  personFamily += "Siblings: " + grabFullNames(findSiblings(person, people)) + "\n";
  personFamily += "Grandchildren: " + grabFullNames(findGrandChildren(person, people));
  alert(personFamily);
}

function displayDescendants(person, people){
  var personDescendants = person.firstName + " " + person.lastName + "'s Descendants:\n" + grabFullNamesLineBreaks(findDescendants(person, people));
  alert (personDescendants);
}

function findDescendants(person, people){
  var foundDescendants = people.filter(function(potentialDescendant){
    if (potentialDescendant.parents.includes(person.id)){
      return true;
      }
      else{
      return false;
      }
  });
    for (let i = 0; i < foundDescendants.length; i++){
      let potentialGrandChild = findDescendants(foundDescendants[i], people);
      if (potentialGrandChild.length > 0){
          foundDescendants.push(potentialGrandChild[0]);
        }
      }
  return foundDescendants;
}

function findGrandChildren(person, people){
  var descendants = findDescendants(person, people);
  var grandChildren = descendants.filter(function(el){
    if (el.parents.includes(person.id)){
      return false;
    }
    else{
      return true;
    }
  })
  return grandChildren;
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
  return foundChildren;
}

function findSiblings(person, people){
  var foundSiblings = people.filter(function(el){
      if ((el.parents.includes(person.parents[0]) || el.parents.includes(person.parents[1])) && el.id != person.id) {
        return true;
      }
      else{
        return false;
      }
  });
  return foundSiblings;
}

function findParents(person, people){
  var foundParents = people.filter(function(potentialParent){
    if (person.parents.includes(potentialParent.id)){
      return true;
    }
    else{
      return false;
    }
  });
  return foundParents;
}

function findSpouse(person, people){
  var foundSpouse = people.filter(function(potentialSpouse){
    if (potentialSpouse.currentSpouse == person.id){
      return true;
      }
      else{
      return false;
      }
  });
  return foundSpouse;
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

function maleFemale(input){
  return input.toLowerCase() == "female" || input.toLowerCase() == "male";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function getAge(dob){
  let currentDate = new Date();
  let birthDate = new Date(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  if (currentDate < (new Date(birthDate.setFullYear(currentDate.getFullYear())))){
    age = age - 1;
  }
  return age;
}
