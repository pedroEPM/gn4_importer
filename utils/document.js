const data = [{
    $search: {
      index: 'notesFT',
      compound: {
        must: [
          {
              range: {
              path: 'date', 
                gte: new Date("2015-01-01"),
                lte: new Date("2015-12-31"),
              
            }
          }
        ]
      }
    }
  }, {
    $count: 'string'
    
  }]