meteor build .
mv morandonocanada.tar.gz /home/morandonocanada.com
cd /home/morandonocanada.com
tar -zxf morandonocanada.tar.gz
cd /home/morandonocanada.com/bundle/programs/server
npm install
chown morandonocanada:morandonocanada /home/morandonocanada.com -R
stop morandonocanada
start morandonocanada
