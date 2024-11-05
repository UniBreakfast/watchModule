# [watchModule](https://github.com/UniBreakfast/watchModule)

## Usage Demo for my npm-module [`up2require`](https://github.com/UniBreakfast/up2require) 

On a screenshot below app is started with `index.js`, then it calls a function every 1.5 seconds. 
That function is imported from a custom module which uses another function imprted from another module. 
Then right while the program is running I change the file open on the right (`'abc'` to `'abd'`) and save it.
That submodule is immediately reimported automatically without restart and function is replaced internally with the updated version.
Then I change the file in the center (`11` to `12`) and save it.
That module is immediately reimported automatically too so the `console.log(12)` is called.
But the function is still working as it was before.

![image](https://github.com/user-attachments/assets/dd80abbc-70c1-4ac7-91b2-d4f5904b055f)
