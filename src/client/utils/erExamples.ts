export const mainExample = 
`ent Librarians {
  SSN *
  Name
  Salary
}

ent Interns {}

ent Employees {
  AdmissionDate
}

ent TeachingInstitutions {
  EIN *
  Name
}

ent Copies {
  Number *
  ConservationState
}

ent Customers {
  ID *
  Name
  Phone <1,2>
  Address [
    ZipCode
    Street
    Number
    Complement
  ]
}

ent Books {
  ISBN *
  Title
  Volume
  Year
  NumberOfPages
}

ent Authors {
  SSN *
  Name
}

ent Publishers {
  EIN *
  Name
}

ent RelevantCourses {
  Name
}

spe {
  Librarians (t,d)
  Interns
  Employees
}

rel offer {
  TeachingInstitutions (1,1)
  RelevantCourses (2,10)
}

rel accountability {
  Employees (1,1)
  Interns (0,n)
  StartDate
}
  
rel bond {
  Interns (0,n)
  TeachingInstitutions (1,1)
}

rel registration {
  Librarians (1,1)
  Loan (0,n)
}

rel availability {
  Books (1,1)
  w Copies (1,n)
}

rel publication {
  Publishers (1,1)
  Books (0,n)
}

rel authorship {
  Books (0,n)
  Authors (1,n)
  Order
}

aent Loan {
  Copies (0,n)
  Customers (0,1)
  WithdrawalDate
  ExpectedReturnDate
  FineAmount
}

rel referral {
  Customers (0,1) referred_by
  Customers (0,n) referred
}

union SearchFilters {
  Publishers
  Books
  Authors
}

rel internship_contract {
  TeachingInstitutions (1,1)
  Interns (1,n)
  Employees (1,1)
  StartDate
  Salary
}`

export const relationshipExample = 
`ent Driver {}

ent Car {}

rel has {
  Driver (0,n)
  Car (0,n)
  since
}`

export const nAryRelationshipExample = 
`ent City {}
ent Supplier {}
ent Product {}

rel distribution {
  City (1,n)
  Supplier (1,1)
  Product (1,n)
}`


export const selfRelationships = 
`ent Worker {}

rel supervision {
  Worker (0,1) supervisor
  Worker (0,n) supervisee
}`

export const specializationsTotalDisjoint = 
`ent Person {}

ent Developer {}

ent Non-Developer {}

spe {
  Person (t,d)
  Developer
  Non-Developer
}`


export const specializationsPartialOverlap = 
`ent Person {}

ent Cyclist {}

ent Engineer {}

spe {
  Person (p,o)
  Cyclist
  Engineer
}`

export const compositeAttributes = 
`ent Employee {
  name
  birthdate
  address [
    number
    street
    suburb
  ]
  salary
}`

export const multivaluedAttributes =
`ent Person {
  name
  languages <1,3>
}`

export const associativeEntities = 
`ent Librarians {}
ent Books {}
ent Customers {}

rel registration {
  Librarians (1,1)
  loan (0,n)
}

aent loan {
  Books (0,n)
  Customers (0,1)
  withdrawal_date
  return_date
}`

export const union = 
`ent Car {}
ent Truck {}

union Vehicle {
  Car
  Truck
  plate_number
}`

export const weakEntity =
`ent Book {
  isbn *
  title
}

ent Copy {
  id
  acquisition_date
}

rel has {
  Book (1,1)
  w Copy (0,n)
}`
