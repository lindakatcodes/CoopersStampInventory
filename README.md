Simple inventory tracker utilizing a Google Spreadsheet as the database/storage. Written in HTML, CSS, and JavaScript.

If you like this project, or have ever wanted to do this but couldn't figure it out with JavaScript, please feel free to fork this and modify it for your needs!
I'm using this to track stamps at my store, so the variable names and main array are all labeled for my specific needs. They should be easy enough to change out for whatever you might want to track. Again this is a super simple, just tracking item name and quantity page. It may not fit your needs. But if it helps you get started and grow, then please go for it and share it with me when you're done!

An important side note: in my update function, because my data array is so small, I ended up writing out all the variables from my stamp inventory instead of looping through and dynamically doing it. If you end up using this and have an array that is shorter or longer than mine, you'll need to adjust for that! 

The main parts I removed that you'd actually need to get for your indivdual Google Spreadsheet are the following:
- Client ID: You get this from the Google Developers Console. I followed the JavaScript tutorial here (https://developers.google.com/sheets/api/quickstart/js) and it links you to a wizard and walkthrough on setting up your program and authorization. The Client ID will show in the OAuth section.
- Spreadsheet ID: This deals with the spreadsheet you want to access. In the URL for that sheet, it will show something like //docs.google.com/spreadsheets/d/somecrazylongstring/otherdata. That crazy long string is your spreadsheet ID, which you'll copy into the getData and update sections.
- Range: This is the actual range you want to get and update. It's worth noting that mine only uses one range. You can update and access multiple ranges if you need to. This uses A1 notation, so you'd input something like 'sheet1!A1:B5' in the getData and update functions.

Some links that I found really helpful while working on this:
- Google API Explorer for Sheets v4 - https://developers.google.com/apis-explorer/#p/sheets/v4/
- Google Sheets API (especially the reference and samples pages, and the numerous links therein) - https://developers.google.com/sheets/api/

