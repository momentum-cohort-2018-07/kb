# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Artist.delete_all

artists = [
  {
    name: 'Michelangelo',
    bio: 'Painter, sculptor, architect and poet Michelangelo di Lodovico Buonarroti Simoni (March 6, 1475 to February 18, 1564) is considered one of the most famous artists of the Italian Renaissance, with works including the David and Pieta statues and the ceiling paintings of the Sistine Chapel, including the Last Judgment. Born to a family of moderate means in the banking business, Michelangelo became an apprentice to a painter before studying in the sculpture gardens of the powerful Medici family. What followed was a remarkable career as an artist, recognized in his own time for his artistic virtuosity. Although he always considered himself a Florentine, Michelangelo lived most of his life in Rome, where he died at age 88.'
  },
  {
    name: 'Hans Holbein',
    bio: 'Hans Holbein, the Younger is known for the compelling realism of his portraits, the most notable of which depict the royal court of Henry VIII. During his life he produced over 150 life-sized and miniature portraits of royalty and nobility.'
  },
  {
    name: 'Mary Cassatt',
    bio: 'Born on May 22, 1844, in Allegheny City, Pennsylvania, Mary Cassatt was one of the leading artists in the Impressionist movement of the later part of the 1800s. Moving to Paris, her home for the rest of her life, she was befriended by Edgar Degas. After 1910, her increasingly poor eyesight virtually put an end to her serious painting, and she died in 1926.'
  },
  {
    name: 'El Greco',
    bio: 'El Greco was born around 1541 in Crete, which was then part of the Republic of Venice. In his mid-twenties, he traveled to Venice and studied under Titian, who was the most renowned painter of his day. Around age 35, he moved to Toledo, Spain, where he lived and worked for the rest of his life, producing his best-known paintings. His works from this period are seen as precursors of both Expressionism and Cubism. He is remembered chiefly for his elongated, tortured figures, often religious in nature, the style of which baffled his contemporaries but helped establish his reputation in the years to come.'
  },
  {
    name: 'Edouard Manet',
    bio: 'Born into a bourgeoisie household in Paris, France, in 1832, Edouard Manet was fascinated by painting at a young age. His parents disapproved of his interest, but he eventually went to art school and studied the old masters in Europe. Manet\'s most famous works include The Luncheon on the Grass and Olympia. Manet led the French transition from realism to impressionism. By the time of his death, in 1883, he was a respected revolutionary artist.'
  },
  {
    name: 'Frida Kahlo',
    bio: 'Artist Frida Kahlo was considered one of Mexico\'s greatest artists who began painting mostly self-portraits after she was severely injured in a bus accident. Kahlo later became politically active and married fellow communist artist Diego Rivera in 1929. She exhibited her paintings in Paris and Mexico before her death in 1954.'
  },
  {
    name: 'Jean-Michel Basquiat',
    bio: 'Jean-Michel Basquiat was born on December 22, 1960, in Brooklyn, New York. He first attracted attention for his graffiti under the name "SAMO" in New York City. He sold sweatshirts and postcards featuring his artwork on the streets before his painting career took off. He collaborated with Andy Warhol in the mid-1980s, which resulted in a show of their work. Basquiat died on August 12, 1988, in New York City.'
  },
  {
    name: 'Artemisia Gentileschi',
    bio: 'Famed painter Artemisia Gentileschi was born on July 8, 1593, in Rome, Italy. She painted her earliest signed and dated work, "Susanna and the Elders," around 1610, and later created such works as "Madonna and Child, "Judith Slaying Holofernes" and "Cleopatra." Gentileschi lived in Florence for several years, and later spent time in Genoa and Venice. In 1630, she moved to Naples. Around 1638, she and her father, Orazio Gentileschi, worked together on a series for Queen Henrietta Maria. She died circa 1652 in Naples, Italy.'
  },
  {
    name: 'Paul Klee',
    bio: 'Paul Klee was born in Münchenbuchsee, Switzerland, on December 18, 1879. Klee participated in and was influenced by a range of artistic movements, including surrealism, cubism and expressionism. He taught art in Germany until 1933, when the National Socialists declared his work indecent. The Klee family fled to Switzerland, where Paul Klee died on June 29, 1940.'
  },
  {
    name: 'John Singer Sargent',
    bio: 'John Singer Sargent was born in 1856 in Florence, Italy. He earned early acclaim for his promise as a portraitist, although he drew harsh reviews for his exhibition of Madame X at the Paris Salon of 1884. He reclaimed a favorable reputation by the end of the decade, and by the early 20th century he was devoting more time to war-themed paintings, landscapes and watercolors. Sargent died in 1925 in London, England.'
  }
]

artists.map do |a|
  Artist.create!(
    name: a[:name],
    bio: a[:bio]
  )
end
