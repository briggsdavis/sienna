const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const img = {
  pasta: u("1551183053-bf91a1d81141"),
  pastaClose: u("1473093295043-cdd812d0e601"),
  pizza: u("1574071318508-1cdbab80d002"),
  dough: u("1556761175-b413da4baf72"),
  bread: u("1572441713132-c542fc4fe282"),
  tiramisu: u("1571877227200-a0d98ea607e9"),
  antipasti: u("1544025162-d76694265947"),
  wine: u("1510812431401-41d2bd2722f3"),
  tomatoes: u("1592924357228-91a4daadcfea"),
  interior: u("1517248135467-4c7edcad34c4"),
  alley: u("1525874684015-58379d421a52"),
  oil: u("1474979266404-7eaacbcd87c5"),
  hands: u("1556909212-d5b604d0c90d"),
  spritz: u("1551751299-1b51cab2694c"),
  lemon: u("1587049352846-4a222e784d38"),
  cheese: u("1452195100486-9cc805987862"),
  marketTable: u("1498579150354-977475b7ea0b"),
  garlic: u("1615485925600-97237c4fc1ec"),
}
