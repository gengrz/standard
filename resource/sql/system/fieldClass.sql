
#sql("pageList")
SELECT
    r.*
FROM


   fieldclass r 

   where 1=1
	  #for(xx:cond)
		  #if(xx.value&&xx.value!="%%") 
				and   #(xx.key) #para(xx.value)
		  #end 
  	  #end
  
order by #(sort) #(order) 
#end


#sql("batchDel")
DELETE FROM  fieldclass  where id in (
        #for(id : ids)
            #para(id)
            #if(!for.last),#end
        #end
    )
#end
